import type { Language } from '../types';

// Piccole righe di codice, semplici e senza indentazione complessa,
// pensate per essere digitate velocemente. Vengono unite a caso
// finché non si raggiunge una lunghezza sufficiente per 30 secondi di typing.

const SNIPPETS: Record<Language, string[]> = {
  javascript: [
    'const sum = (a, b) => a + b;',
    'function isEven(n) { return n % 2 === 0; }',
    'const arr = [1, 2, 3].map(x => x * 2);',
    'let user = { name: "Ada", age: 30 };',
    'for (let i = 0; i < 10; i++) { console.log(i); }',
    'const promise = new Promise((resolve) => resolve(42));',
    'array.filter(item => item.active).length;',
    'const [count, setCount] = useState(0);',
    'export default function App() { return null; }',
    'const clone = JSON.parse(JSON.stringify(obj));',
    'if (typeof value === "undefined") return null;',
    'window.addEventListener("resize", handleResize);',
  ],
  typescript: [
    'interface User { name: string; age: number; }',
    'const sum = (a: number, b: number): number => a + b;',
    'type Status = "idle" | "loading" | "done";',
    'function identity<T>(value: T): T { return value; }',
    'const users: User[] = [];',
    'class Stack<T> { private items: T[] = []; }',
    'const isString = (x: unknown): x is string => typeof x === "string";',
    'enum Direction { Up, Down, Left, Right }',
    'const config: Readonly<Options> = defaultOptions;',
    'export type Handler = (event: MouseEvent) => void;',
    'let total: number = items.reduce((a, b) => a + b, 0);',
    'async function fetchUser(id: string): Promise<User> { return api.get(id); }',
  ],
  python: [
    'def add(a, b): return a + b',
    'squares = [x * x for x in range(10)]',
    'class Point: def __init__(self, x, y): self.x = x',
    'with open("file.txt") as f: data = f.read()',
    'if __name__ == "__main__": main()',
    'result = sorted(items, key=lambda x: x.value)',
    'def is_even(n): return n % 2 == 0',
    'user = {"name": "Ada", "age": 30}',
    'try: value = int(text)\nexcept ValueError: value = 0',
    'import numpy as np',
    'for i in range(10): print(i)',
    'total = sum(item.price for item in cart)',
  ],
  java: [
    'public static int add(int a, int b) { return a + b; }',
    'List<String> names = new ArrayList<>();',
    'if (value == null) { throw new NullPointerException(); }',
    'for (int i = 0; i < 10; i++) { System.out.println(i); }',
    'public class Point { private int x; private int y; }',
    'String result = String.format("Hello, %s!", name);',
    'Map<String, Integer> scores = new HashMap<>();',
    'try { risky(); } catch (Exception e) { log(e); }',
    'boolean isEven = number % 2 == 0;',
    'public interface Shape { double area(); }',
    'int[] numbers = { 1, 2, 3, 4, 5 };',
    'Optional<User> user = repository.findById(id);',
  ],
  cpp: [
    'int add(int a, int b) { return a + b; }',
    'std::vector<int> numbers = {1, 2, 3};',
    'for (int i = 0; i < 10; i++) { std::cout << i; }',
    'class Point { public: int x; int y; };',
    'if (ptr == nullptr) { return false; }',
    'std::string name = "Ada Lovelace";',
    'auto square = [](int x) { return x * x; };',
    'std::unique_ptr<Node> root = std::make_unique<Node>();',
    'while (!queue.empty()) { queue.pop(); }',
    'template<typename T> T max(T a, T b) { return a > b ? a : b; }',
    'std::map<std::string, int> scores;',
    'const double pi = 3.14159265358979;',
  ],
};

/**
 * Genera un blocco di testo per il typer, unendo righe casuali
 * (senza ripetizioni consecutive) finché non si supera targetLength.
 */
export function generateTypingText(language: Language, targetLength = 600): string {
  const pool = SNIPPETS[language];
  const lines: string[] = [];
  let length = 0;
  let lastIndex = -1;

  while (length < targetLength) {
    let index = Math.floor(Math.random() * pool.length);
    if (index === lastIndex) {
      index = (index + 1) % pool.length;
    }
    lastIndex = index;
    lines.push(pool[index]);
    length += pool[index].length + 1;
  }

  return lines.join('\n');
}
