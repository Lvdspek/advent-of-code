const fs = require('fs');
import TreeNode from "../types/TreeNode.ts";

type ExplorerNode<T> = TreeNode<T> & {
    explorerType : string;
    size? : Number;
    parent? : ExplorerNode<T>;
};

const commandText = fs.readFileSync("day7/input.txt", "utf-8");

const commands = commandText.split("\r\n"); //.slice(0,30);
console.log(commands);

const startingNode : ExplorerNode<string> = {
    value : "/",
    explorerType: "dir",
    children: [],
};

let currentDirectory = startingNode;
let index = 0;

for (let command of commands) {
    index++;
    console.log(index);

    if (command.startsWith("$ ")) {
        command = command.split("$ ")[1];

        if (command.startsWith("cd")) {
            let dir = command.split("cd ")[1];

            if (currentDirectory.value !== dir) {
                let children = currentDirectory.children as ExplorerNode<string>[];
                let childDir = children.
                    find(c => c.value === dir && c.explorerType === "dir") as ExplorerNode<string>;

                if (childDir) {
                    currentDirectory = childDir;
                }
            } else if (dir === "..") {
                currentDirectory = currentDirectory.parent;
            }
        } else if (command.startsWith("ls")) {

        }
    }
    else { 
        if (command.match(/^\d/)) {
            const node : ExplorerNode<string> = {
                explorerType : "file",
                size : Number(command.split(' ')[0]),
                value : command.split(' ')[1],
                parent : currentDirectory,
            };

            if (!currentDirectory.children) {
                console.log(currentDirectory.value + " doesn't have children");
            }
            
            currentDirectory.children.push(node);
        }
        else {
            const node : ExplorerNode<string> = {
                explorerType: "dir",
                value : command.split("dir ")[1],
                children : [],
                parent : currentDirectory,
            }
            
            if (!currentDirectory.children) {
                console.log(currentDirectory.value + " doesn't have children");
            }

            currentDirectory.children.push(node);
        }
    }
}

console.log(startingNode);
