# This is used for deduplication of registered functions
FUNCTION_NAME = "generate_report.py"


def process(x):
    '''
    Processes a message from the local expiration stream
    Note: in this example we simply print to the log, but feel free to replace
    this logic with your own, e.g. an HTTP request to a REST API or a call to an
    external data store.
    '''
    log(f"Key '{x['value']['key']}' expired at {x['id'].split('-')[0]}")


cap = GB('KeysReader', desc=FUNCTION_NAME)
cap.foreach(lambda x:
            execute('XADD', f'expired:{hashtag()}', '*', 'key', x['key']))
cap.register(prefix='*',
             mode='sync',
             eventTypes=['expired'],
             readValue=False)

proc = GB('StreamReader', desc=FUNCTION_NAME)
proc.foreach(process)
proc.register(prefix='expired:*',
              batch=100,
              duration=1)
