import json

# This is used for deduplication of registered functions
FUNCTION_NAME = "generate_report.py"


def process(x):
    session_id = x['value']['id']
    ended_session = json.loads(execute('JSON.GET', f"Session:{session_id}"))
    log(f"Calculating totals for session {ended_session['id']}")
    for question in ended_session['questions']:
        total = 0
        for answer in question["answers"]:
            total += int(answer["answer"])
        execute('SET', f"Question:{question['id']}:total", total)
        log(f"Overall score for '{question['question']}' = {total}")


def get_all_sessions(squad_id):
    """
    Returns all ended sessions for a certain squad.
    Unused for now...
    """
    returnVal = []
    all_session_keys = execute('SCAN', '', 'MATCH', 'Session:*')
    for key in all_session_keys[1]:
        session = json.loads(execute('JSON.GET', key))
        if (session['squad']['id'] == squad_id and session['active'] is False):
            returnVal.append(session)

    return returnVal


# Whenever a session is ended, it sends out some data in a stream
# This StreamReaders reads those events and triggers the process function
proc = GB('StreamReader', desc=FUNCTION_NAME)
proc.foreach(process)
proc.register(prefix='Session-end',
              duration=1)
