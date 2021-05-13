import json
import requests
from collections import defaultdict

# This is used for deduplication of registered functions
FUNCTION_NAME = "send_notification.py"


def process(x):
    squad = json.loads(x['value']['squad'])
    sessions = get_all_sessions(squad['id'])
    log(f"Got {len(sessions)} sessions to send notifications for")
    sendDiscord(sessions, squad)


def getEmoji(x):
    if x < 1:
        return "🔴"
    elif 1 <= x < 2:
        return "🟠"
    else:
        return "🟢"


def sendDiscord(sessions, squad):
    if 'discordWebhook' not in squad['notificationConfig']:
        log(str(squad))
        return
    log("Sending notif to Discord")
    discord_webhook = squad['notificationConfig']['discordWebhook']

    question_data = defaultdict(dict)

    for session in sessions:
        for question in session['questions']:
            avg = execute("GET", f"Question:{question['id']}:average")
            log(f"Got average {avg} for {question['id']}")
            questionText = question['question']
            currentString = question_data[questionText]
            if not isinstance(currentString, str):
                currentString = ""
            question_data[questionText] = "".join(
                [currentString, getEmoji(float(avg))])

    embed = {
        "description": "These are averages of previous sessions. Every column is a session and every values is an average of all members' answers",
        "title": "Historical sessions",
        "fields": []
    }
    data = {
        "content": "",
        "username": "Feature Creep",
        "embeds": [
            embed
        ],
    }
    headers = {
        "Content-Type": "application/json"
    }

    for q in question_data:
        embed['fields'].append({'name': q, 'value': question_data[q]})

    result = requests.post(discord_webhook, json=data, headers=headers)

    if 200 <= result.status_code < 300:
        log(f"Webhook sent {result.status_code}")
    else:
        log(
            f"Not sent with {result.status_code}, response:\n{result.json()}")


def get_all_sessions(squad_id):
    """
    Returns all ended sessions for a certain squad.
    """
    returnVal = []
    all_session_keys = get_session_keys()
    for key in all_session_keys:
        session = json.loads(execute('JSON.GET', key))
        if (session['squad']['id'] == squad_id and session['active'] is False):
            returnVal.append(session)

    return returnVal

# Scan is a cursor based iterator
# Which means we may have to do many calls before we have all the data we need
# See: https://redis.io/commands/scan


def get_session_keys(current_keys=[], cursor="0"):
    session_keys = execute('SCAN', cursor, 'MATCH', 'Session:*')
    # log(f"Cursor is at {session_keys[0]}")
    # log(f"Found {len(session_keys[1])} keys this time!")
    current_keys.append(session_keys[1])
    if(session_keys[0] == "0"):
        flat_list = [item for sublist in current_keys for item in sublist]
        # This removes any duplicates
        return list(dict.fromkeys(flat_list))
    else:
        return get_session_keys(current_keys, session_keys[0])


# Whenever a session is ended, it sends out some data in a stream
# This StreamReaders reads those events and triggers the process function
proc = GB('StreamReader', desc=FUNCTION_NAME)
proc.foreach(process)
proc.register(prefix='Squad-report',
              duration=1)
