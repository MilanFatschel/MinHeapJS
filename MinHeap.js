class MinHeap {

  constructor() {
    this.heap = [];
    }
  
    // Example of Parent and Child Array
    // P LC RC
    // [1,2,3] =      1
    //               2 3
    getLeftChildIndex(parentIndex) { return 2 * parentIndex + 1; }
    getRightChildIndex(parentIndex) { return 2 * parentIndex + 2; }
    getParentIndex(childIndex) { return Math.floor((childIndex - 1) / 2); }
    
    hasLeftChild(index) { return this.getLeftChildIndex(index) < this.heap.length; }
    hasRightChild(index) { return this.getRightChildIndex(index) < this.heap.length; }
    hasParent(index) { return index > 0};
    
    leftChild(index) { return this.heap[this.getLeftChildIndex(index)]; }
    rightChild(index) { return this.heap[this.getRightChildIndex(index)]; }
    parent(index) { return this.heap[this.getParentIndex(index)]; }

    heapifyUp() {
      // If the parent is greater than the current swap. Continue until heap
      // is in order.
      var index = this.heap.length - 1;
      while(this.hasParent(index) && this.parent(index).val > this.heap[index].val) {
        this.swap(this.getParentIndex(index), index);
        index = this.getParentIndex(index);
        
      }
    }
    
    heapifyDown() {
      // Get the smaller of the two childs. If the parent is greater than the smallest
      // child, swap them. Keep doing this until the heap is in order.
      var index  = 0;
      while(this.hasLeftChild(index)) {
        var smallerChildIndex = this.getLeftChildIndex(index);
        if(this.hasRightChild(index) && this.rightChild(index).val < this.leftChild(index).val) {
          smallerChildIndex = this.getRightChildIndex(index);
        }
        
        if(this.heap[index].val > this.heap[smallerChildIndex].val) {
          this.swap(index, smallerChildIndex);
          index = smallerChildIndex;
        } else {
            break;
        }   
      }
    }
      
    swap(index1, index2) {
      var temp = this.heap[index1];
      this.heap[index1] = this.heap[index2];
      this.heap[index2] = temp;
    }
    
    peek() {
      if(this.heap.length === 0) throw Error("Error: Heap underflow");
      return this.heap[0];
    }
    
    getSize() {
        return this.heap.length;
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
    
    remove() {
      // Get the top element. Copy the last element and place it at the top.
      // Bubble it down until the heap is in order. 
      if(this.heap.length === 0) throw Error("Error: Heap underflow");
      var item = this.heap[0];
      this.heap[0] = this.heap[this.heap.length - 1];
      this.heap.pop();
      this.heapifyDown();
      return item;
    }
    
    add(item) {
      // Add the new element to the last spot in the heap. 
      // Bubble up until the heap is in order.
      this.heap.push(item);
      this.heapifyUp();
    }
}
