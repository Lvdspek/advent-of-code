const fs = require("fs");
import type TreeNode from "../types/TreeNode.ts";


type ExplorerNode<T> = TreeNode<T> & {
    explorerType: string;
    size?: number;
    parent?: ExplorerNode<T>;
};

const commandText = fs.readFileSync("day7/input.txt", "utf-8");

const commands = commandText.split("\r\n"); //.slice(0, 30);
//console.log(commands);

const startingNode: ExplorerNode<string> = {
    value: "/",
    explorerType: "dir",
    children: [],
};

let currentDirectory = startingNode;
let index = 0;

for (let command of commands) { //.slice(0,30)) {
    index++;
    //console.log(index);
    console.log(command);

    if (command.startsWith("$ ")) {
        command = command.split("$ ")[1];

        //console.log(command);
        if (command.startsWith("cd")) {
            let dir = command.split("cd ")[1];

            if (dir === "..") {
                if (currentDirectory.value === "/") {
                    console.log("current directory is /, cannot move higher");
                } else {
                    currentDirectory = currentDirectory.parent;
                    console.log("switched to " + currentDirectory.value);
                }
            } else if (currentDirectory.value !== dir) {
                let children = currentDirectory.children as ExplorerNode<string>[];
                let childDir = children.find(
                    (c) => c.value === dir && c.explorerType === "dir"
                ) as ExplorerNode<string>;

                if (childDir) {
                    currentDirectory = childDir;
                    console.log("switched to " + currentDirectory.value);
                } else {
                    console.log("currentDir is still " + currentDirectory.value);
                }
            }
        } else if (command.startsWith("ls")) {
            console.log("listing files in " + currentDirectory.value);
        }
    } else if (!command) {
        console.log("command is undefined, skipping");
        break;
    } else {
        //console.log(command);
        if (command.match(/^\d/)) {
            const node: ExplorerNode<string> = {
                explorerType: "file",
                size: Number(command.split(" ")[0]),
                value: command.split(" ")[1],
                parent: currentDirectory,
            };

            //if (!currentDirectory.children) {
            //  console.log(currentDirectory.value + " doesn't have children");
            //}

            if (currentDirectory.children.find(c => c.value === node.value)) {
                console.log("Current dir already has a file called " + node.value);
            } else { 
                currentDirectory.children.push(node);
                console.log("Added file " + node.value + " to " + currentDirectory.value);
            }
        } else {
            const node: ExplorerNode<string> = {
                explorerType: "dir",
                value: command.split("dir ")[1],
                children: [],
                parent: currentDirectory,
            };

            if (!currentDirectory.children) {
                console.log(currentDirectory.value + " doesn't have children");
            }

            if (currentDirectory.children.find(c => c.value === node.value)) {
                console.log("Current dir already has a dir called " + node.value);
            } else { 
                currentDirectory.children.push(node);
                console.log("Added dir " + node.value + " to " + currentDirectory.value);
            }
        }
    }
}

function getDirectorySize(
    node: ExplorerNode<string>,
    dirsOfInterest: ExplorerNode<string>[]
): number {
    let size = 0;

    for (let childNode of node.children as ExplorerNode<string>[]) {
        if (childNode.explorerType === "dir") {
            getDirectorySize(childNode, dirsOfInterest);
        }

        size += childNode.size;
        console.log(childNode.value + " " + childNode.explorerType + ", size " + node.value + ": " + size);
    }

    node.size = size;
    if (node.explorerType === "dir" && node.size > 0) {
        dirsOfInterest.push(node);
    }

    return size;
}

let dirsOfInterest: ExplorerNode<string>[] = [];
getDirectorySize(startingNode, dirsOfInterest);
//console.log(dirsOfInterest.filter(d => d.size <= 100000).map(d => d.size).join(","));

let sum = 0;
dirsOfInterest
.filter((d) => d.size <= 100000)
.forEach((d) => {
    sum += d.size;
});

console.log(sum);

