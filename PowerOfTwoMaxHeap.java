import java.util.Arrays;
import java.util.NoSuchElementException;

public class PowerOfTwoMaxHeap<T extends Comparable<T>> {

    private static final int DEFAULT_INITIAL_CAPACITY = 16;

    private final int childrenExponent;
    private Object[] heap;
    private int size;

    public PowerOfTwoMaxHeap(int childrenExponent) {
        this(childrenExponent, DEFAULT_INITIAL_CAPACITY);
    }

    public PowerOfTwoMaxHeap(int childrenExponent, int initialCapacity) {
        if (childrenExponent < 0 || childrenExponent > 30) {
            throw new IllegalArgumentException(
                "childrenExponent must be between 0 and 30 (inclusive), got: " + childrenExponent
            );
        }
        if (initialCapacity < 0) {
            throw new IllegalArgumentException(
                "initialCapacity must be non-negative, got: " + initialCapacity
            );
        }
        this.childrenExponent = childrenExponent;
        this.heap = new Object[Math.max(initialCapacity, 1)];
        this.size = 0;
    }

    public void insert(T item) {
        if (item == null) {
            throw new IllegalArgumentException("Cannot insert null into PowerOfTwoMaxHeap.");
        }
        ensureCapacity();
        heap[size] = item;
        siftUp(size);
        size++;
    }

    @SuppressWarnings("unchecked")
    public T popMax() {
        if (size == 0) {
            throw new NoSuchElementException("Cannot popMax from an empty heap.");
        }
        T maxItem = (T) heap[0];
        size--;

        if (size > 0) {
            heap[0] = heap[size];
            heap[size] = null;
            siftDown(0);
        } else {
            heap[0] = null;
        }
        return maxItem;
    }

    @SuppressWarnings("unchecked")
    public T peekMax() {
        if (size == 0) {
            throw new NoSuchElementException("Heap is empty.");
        }
        return (T) heap[0];
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    @SuppressWarnings("unchecked")
    private void siftUp(int childIndex) {
        T target = (T) heap[childIndex];
        while (childIndex > 0) {
            int parentIndex = (childIndex - 1) >>> childrenExponent;
            T parent = (T) heap[parentIndex];
            if (target.compareTo(parent) <= 0) {
                break;
            }
            heap[childIndex] = parent;
            childIndex = parentIndex;
        }
        heap[childIndex] = target;
    }

    @SuppressWarnings("unchecked")
    private void siftDown(int parentIndex) {
        T target = (T) heap[parentIndex];
        long childrenPerParent = 1L << childrenExponent;

        while (true) {
            long firstChildLong = ((long) parentIndex << childrenExponent) + 1L;
            if (firstChildLong >= size) {
                break;
            }

            int firstChild = (int) firstChildLong;
            int lastChild = (int) Math.min(firstChildLong + childrenPerParent - 1L, size - 1L);

            int maxChildIndex = firstChild;
            T maxChild = (T) heap[firstChild];
            for (int i = firstChild + 1; i <= lastChild; i++) {
                T candidate = (T) heap[i];
                if (candidate.compareTo(maxChild) > 0) {
                    maxChild = candidate;
                    maxChildIndex = i;
                }
            }

            if (target.compareTo(maxChild) >= 0) {
                break;
            }

            heap[parentIndex] = maxChild;
            parentIndex = maxChildIndex;
        }
        heap[parentIndex] = target;
    }

    private void ensureCapacity() {
        if (size == heap.length) {
            int newCapacity = (heap.length >= Integer.MAX_VALUE / 2)
                ? Integer.MAX_VALUE
                : heap.length * 2;
            heap = Arrays.copyOf(heap, newCapacity);
        }
    }

    public static void main(String[] args) {
        int[] testExponents = {0, 1, 2, 5, 10, 20, 30};
        for (int exp : testExponents) {
            PowerOfTwoMaxHeap<Integer> maxHeap = new PowerOfTwoMaxHeap<>(exp);
            int[] values = {42, 7, 100, -5, 100, 0, 999, 13, 55, 2};
            for (int v : values) {
                maxHeap.insert(v);
            }
            int prev = Integer.MAX_VALUE;
            while (!maxHeap.isEmpty()) {
                int current = maxHeap.popMax();
                if (current > prev) {
                    throw new AssertionError("Heap property violated for exponent " + exp);
                }
                prev = current;
            }
        }
        System.out.println("All tests passed successfully.");
    }
}
