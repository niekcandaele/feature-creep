# RedisGraph

## Possible structure:


'Organisation' -> Has several 'teams' -> has several 'persons'


persons can belong to multiple teams 

teams belong to one (or more ?) organisations


Person
- Firstname
- lastname
- username
- email

Organisation
- name

Teams
- name

Session


Question
- Text

Project
- Name

Answer
- Text
- Number (1-5 or something? For the 'smiley' integration)


## Queries

Show entire graph:

```
MATCH (n)-[]->(m) RETURN n,m LIMIT 40
```
