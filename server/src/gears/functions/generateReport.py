gb = GearsBuilder()


def filter(x):
    value = execute('JSON.GET', x['key'])
    log(str(value))
    return len(x['key']) > 4


a = execute('PING')
log(a)
gb.filter(filter)
gb.run('Session:*')
