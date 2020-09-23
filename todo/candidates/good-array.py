# Install the python extension for VS Code
# (https:#marketplace.visualstudio.com/items?itemName=ms-python.python).

# The Debug Visualizer has no support for Python data extractors yet,
# so to visualize data, your value must be a valid JSON string representing the data.
# See readme for supported data schemas.

from json import dumps
from random import randint

graph = {
    "kind": {"graph": True},
    "nodes": [
        {"id": "1", "label": "1"}
    ],
    "edges": []
}

for i in range(2, 100):
    # add a node
    id = str(i)
    graph["nodes"].append({"id": id, "label": id})
    # connects the node to a random edge
    targetId = str(randint(1, i - 1))
    graph["edges"].append({"from": id, "to": targetId})
    json_graph = dumps(graph)
    print("i is " + str(i))
    # try setting a breakpoint right above
    # then put json_graph into the visualization console and press enter
    # when you step through the code each time you hit the breakpoint
    # the graph should automatically refresh!

# example of json_graph visualization with 10 nodes:
# https://i.imgur.com/RqZuYHH.png

print("finished")
