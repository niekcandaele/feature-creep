const RedisGraph = require("redisgraph.js").Graph;

let graph = new RedisGraph("agile");

(async () => {
    await graph.query("CREATE (:person{name:'jefke',age:32})");
    await graph.query("CREATE (:person{name:'jos',age:30})");

    await graph.query("CREATE (:team{name:'backend nerds',field:'backend'})");
    await graph.query("CREATE (:team{name:'designerzz',field:'frontend'})");

    await graph.query("MATCH (a:person), (b:team) WHERE (a.name = 'jefke' AND b.name='backend nerds') CREATE (a)-[:belongsTo]->(b)");
    await graph.query("MATCH (a:person), (b:team) WHERE (a.name = 'jefke' AND b.name='designerzz') CREATE (a)-[:belongsTo]->(b)");

    await graph.query("MATCH (a:person), (b:team) WHERE (a.name = 'jos' AND b.name='designerzz') CREATE (a)-[:belongsTo]->(b)");


    let res = await graph.query("MATCH (a:person)-[:belongsTo]->(b:team) RETURN a.name,b.name");
    while (res.hasNext()) {
        let record = res.next();
        console.log(`${record.get("a.name")} belongs to team ${record.get('b.name')}`);
    }

    graph.close();

})();