declare type TreeNode<T> = {
  value: T;
  children?: TreeNode<T>[];
};

export default TreeNode;
