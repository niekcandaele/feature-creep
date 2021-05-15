import json

# This is used for deduplication of registered functions
FUNCTION_NAME = "generate_report.py"


def process(x):
    session_id = x['value']['id']
    ended_session = json.loads(execute('JSON.GET', f"Session:{session_id}"))
    for question in ended_session['questions']:
        total = 0
        for answer in question["answers"]:
            total += int(answer["answer"])
        execute('SET', f"Question:{question['id']}:total", total)
        #log(f"Setting average {total / len(question['answers'])} for {question['id']}")
        if len(question['answers']) == 0:
            avg = 0
        else:
            avg = total / len(question['answers'])

        execute(
            'SET', f"Question:{question['id']}:average", avg)
    execute('XADD', 'Squad-report', '*', 'squad',
            json.dumps(ended_session['squad']))
    execute('XADD', 'Squad-report-ts', '*', 'squad',
            json.dumps(ended_session))


# Whenever a session is ended, it sends out some data in a stream
# This StreamReaders reads those events and triggers the process function
proc = GB('StreamReader', desc=FUNCTION_NAME)
proc.foreach(process)
proc.register(prefix='Session-end',
              duration=1)
