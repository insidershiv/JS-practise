/**
 * FEI Questions — Extracted from interview conversation PDF
 * Full solutions from the mentor (ChatGPT); sub-questions and follow-ups included.
 */

export type FEISection =
  | "core-js"
  | "js-utilities"
  | "promises"
  | "dom-browser"
  | "react"
  | "concepts"
  | "system-design"
  | "event-loop";

export type FEIDifficulty = "easy" | "medium" | "hard";

export interface FEIQuestion {
  id: string;
  title: string;
  section: FEISection;
  difficulty: FEIDifficulty;
  /** Full question including any sub-questions or follow-ups from the interview */
  question: string;
  /** Complete solution from the PDF (mentor explanation — step-by-step, code, tables, one-liners) */
  solution: string;
  codeSnippet?: string;
  followUps?: string[];
  tags: string[];
}

export const FEI_SECTIONS: Record<
  FEISection,
  { label: string; description: string }
> = {
  "core-js": { label: "Core JavaScript", description: "Execution context, scope, this, closures" },
  "js-utilities": { label: "JS Utilities", description: "Debounce, throttle, once, memoize" },
  promises: { label: "Promises & Async", description: "Polyfills, retry, all vs allSettled" },
  "dom-browser": { label: "DOM & Browser", description: "Events, delegation, bubbling" },
  react: { label: "React", description: "Synthetic events, delegation" },
  concepts: { label: "Concepts", description: "Definitions and comparisons" },
  "system-design": { label: "System Design", description: "Autocomplete, infinite scroll" },
  "event-loop": { label: "Event Loop", description: "Microtasks, macrotasks, async/await" },
};

export const feiQuestions: FEIQuestion[] = [
  // ——— Core JavaScript ———
  {
    id: "exec-context-hoisting",
    title: "Execution context & hoisting — output",
    section: "core-js",
    difficulty: "medium",
    question: `Explain how JavaScript executes code from the moment a function is called. Cover: call stack, execution context, hoisting, scope chain.

Then answer: what will be the output and WHY? (Do not jump to output — explain execution step-by-step.)

\`\`\`js
console.log(a);
var a = 10;
function foo() {
  console.log(a);
  var a = 20;
}
foo();
console.log(a);
\`\`\`

Re-answer in your own words:
1. What is Execution Context?
2. Why does foo() log undefined instead of 10?
3. What is the final output?`,
    solution: `**JavaScript runs in two phases for every scope (global or function):**

**Phase 1: Memory Creation (Hoisting Phase)** — JS scans the code and allocates memory:
• var → undefined
• function → full function body
• let/const → uninitialized (TDZ)

**Phase 2: Execution Phase** — Code runs line by line; variables get actual values; functions execute when called.

**Execution Context** is a box containing: (1) Memory (Variable Environment), (2) Code (Execution Thread), (3) Scope Chain, (4) this value. Types: Global Execution Context and Function Execution Context. JS uses a Call Stack (LIFO) to manage them.

**Scope Chain:** When JS looks for a variable: current scope → parent scope → global scope. If not found → ReferenceError.

**Step-by-step execution of your code:**

**Step 1 — Global Memory Creation:** Identifier \`a\` = undefined, \`foo\` = function body. (No code executed yet.)

**Step 2 — Global Execution:** Line 1: \`console.log(a)\` → a exists and is undefined → **Output: undefined**. Line 2: \`var a = 10\` assigns 10 to a. Line 3: function already handled. Line 4: \`foo()\` → new Function Execution Context is created.

**Step 3 — foo() Memory Creation:** Inside foo, identifier \`a\` = undefined (this \`a\` is different from global \`a\`).

**Step 4 — foo() Execution:** \`console.log(a)\` → local \`a\` exists but is undefined → **Output: undefined**. Then \`var a = 20\` assigns 20 to local a. Function ends → context popped.

**Step 5 — Back to Global:** Last line \`console.log(a)\` → global a is still 10 → **Output: 10**.

**Final output (in order):** undefined, undefined, 10.

**FAANG-level explanation:** If you only say "because of hoisting" that is not enough. You must say: "Due to separate execution contexts and memory allocation during the creation phase, the local a shadows the global a." Improve "memory is created inside the context" to: "Variables are first resolved in the current execution context, then through the scope chain."`,
    tags: ["execution context", "hoisting", "scope", "shadowing"],
  },
  {
    id: "lexical-scope-1",
    title: "Lexical scope — foo called from bar",
    section: "core-js",
    difficulty: "medium",
    question: `**Follow-up question:** What will be the output now, and why?

\`\`\`js
var a = 10;
function foo() {
  console.log(a);
}
function bar() {
  var a = 20;
  foo();
}
bar();
\`\`\`

Rules: Don't rush. Explain scope chain. Say which execution context \`a\` comes from.`,
    solution: `**Output: 10** (not 20).

**Why your intuition might say 20:** "If not found in current scope, it should go to its parent — bar — where a = 20." That sounds logical but it is NOT how JavaScript works.

**The rule (memorize this):** JavaScript uses **lexical (static) scoping**, NOT dynamic scoping. A function's scope is determined by **where it is written**, not where it is called. Scope is fixed at definition time, not runtime.

**Scope structure:** Global scope has \`a = 10\`, \`foo()\` (defined in GLOBAL scope), \`bar()\` (defined in GLOBAL scope). Key point: foo is not defined inside bar; foo has no access to bar's local variables.

**What happens at runtime:** (1) bar() is called → bar execution context is created, local a = 20. (2) foo() is called from inside bar — **calling location does NOT affect scope**. (3) Inside foo, \`console.log(a)\`: JS looks for a in foo → not found; parent scope of foo → GLOBAL; finds a = 10. So output is 10. Bar is NOT the parent scope of foo because foo was defined globally. Parent scope of foo = Global, not bar.

**One-line interview answer:** "JavaScript uses lexical scoping, so a function's scope is determined by where it is defined, not where it is called."

**Mental model:** Wrong = "Who called me?" (dynamic). Correct = "Where was I written?" (lexical).`,
    tags: ["lexical scope", "scope chain", "static vs dynamic"],
  },
  {
    id: "lexical-scope-2",
    title: "Lexical scope — foo defined inside bar",
    section: "core-js",
    difficulty: "easy",
    question: `**Trick question:** What will this output?

\`\`\`js
var a = 10;
function bar() {
  var a = 20;
  function foo() {
    console.log(a);
  }
  foo();
}
bar();
\`\`\`

Think: Where is foo defined? What is its parent scope?`,
    solution: `**Output: 20.**

foo is defined inside bar, so bar is its parent scope. Variable \`a\` is not defined in foo's scope, so it uses the lexical scope chain and reads \`a\` from function bar → 20.

**Scope chain:** foo() → bar() → global. Lookup order: foo scope → not found; bar scope → found (a = 20). Stops searching.

**Interview one-liner:** "Since foo is defined inside bar, its lexical parent is bar, so it closes over bar's variables and accesses a = 20." That sentence signals strong JS fundamentals. You implicitly used **closures** here — a closure is when a function remembers variables from its lexical parent scope even after that scope has finished execution.`,
    tags: ["lexical scope", "closure"],
  },
  {
    id: "closure-basics",
    title: "Closure — outer/inner",
    section: "core-js",
    difficulty: "easy",
    question: `Quick sanity check (answer in 3 bullet points):

\`\`\`js
function outer() {
  let x = 5;
  return function inner() {
    console.log(x);
  };
}
const fn = outer();
fn();
\`\`\`

1. What is this concept called?
2. What is the output?
3. Why doesn't x get destroyed?`,
    solution: `**1. Concept:** Closure — a function along with its lexical environment.

**2. Output:** 5.

**3. Why x isn't destroyed:** x is not garbage collected because the returned inner function still holds a reference to it through a closure, so the lexical environment remains alive. This shows memory understanding and GC awareness.

**Upgrade your wording:** Instead of "the function remembers its lexical scope chain," say: "Because the inner function closes over the variable, the lexical environment is retained as long as there is a reference to the function." Saying "JS keeps it in memory" is weak; the sentence above is a strong signal.`,
    tags: ["closure", "lexical environment", "GC"],
  },
  {
    id: "this-method-lost",
    title: "this — method assigned to variable",
    section: "core-js",
    difficulty: "medium",
    question: `What will be the output and WHY?

\`\`\`js
const obj = {
  name: "FAANG",
  greet: function () {
    console.log(this.name);
  }
};
const greetFn = obj.greet;
greetFn();
\`\`\`

Rules: Don't guess. Explain how \`this\` is determined. Mention binding rule.

**Follow-up:** How would you make sure this logs "FAANG" without changing the call site? Give 2 different solutions.`,
    solution: `**Four binding rules (priority order):** (1) new binding — new Fn() → this = new object. (2) Explicit — fn.call(obj) / apply / bind → this = obj. (3) Implicit — obj.fn() → this = obj. (4) Default — fn() → this = global (or undefined in strict mode).

**Key rule:** \`this\` is determined by **how the function is CALLED**, not where it is defined.

**Step-by-step:** (1) Object creation — obj.greet is a function, no execution yet. (2) \`const greetFn = obj.greet\` — you copied the function reference, not the object. greetFn is now a standalone function. (3) \`greetFn()\` — how is it called? Not obj.greet(); just greetFn(). So **default binding** applies. In strict mode this = undefined, so this.name → undefined. **Final output: undefined** (or error in strict when accessing this.name).

**FAANG-grade explanation:** "When the method is assigned to another variable and invoked as a standalone function, the implicit binding is lost, so this falls back to default binding."

**Fixes (follow-up):** (1) \`const greetFn = obj.greet.bind(obj); greetFn();\` — bind creates a new function with this permanently bound to obj (used in React class components, event handlers). (2) \`greetFn.call(obj);\` — call sets this for that single invocation. **Table:** call/apply set this immediately and do not return a new function; bind sets this later and returns a new function.`,
    tags: ["this", "default binding", "implicit binding", "bind", "call"],
  },
  {
    id: "this-arrow-object",
    title: "this — arrow function in object",
    section: "core-js",
    difficulty: "medium",
    question: `What will this print and WHY?

\`\`\`js
const obj = {
  name: "FAANG",
  greet: () => {
    console.log(this.name);
  }
};
obj.greet();
\`\`\`

Rules: Mention lexical this. Say where this comes from. (Common mistake: "they refer to the this where they are called" — that is wrong.)`,
    solution: `**Output: undefined.**

**Correction:** Arrow functions capture \`this\` from **where they are defined**, not where they are called. That difference is critical in interviews.

**What happens:** greet is an arrow function. Arrow functions do not have their own \`this\`, cannot be bound with call/apply/bind, and **lexically capture this from the surrounding scope**. Where is greet defined? Inside an object literal, not inside a function — so surrounding scope is global. In strict mode, this in global scope = undefined. So this.name → undefined.

**Interview one-liner:** "Arrow functions don't have their own this; they lexically inherit it from the surrounding scope at definition time."

**React relevance:** In React, wrong = \`onClick={() => this.handleClick()}\`, correct = \`onClick={this.handleClick}\`. Arrow functions can silently break this if misused.`,
    tags: ["this", "arrow function", "lexical this"],
  },
  {
    id: "this-settimeout",
    title: "this — setTimeout callback (and DevTools gotcha)",
    section: "core-js",
    difficulty: "medium",
    question: `What will this print?

\`\`\`js
function Foo() {
  this.x = 10;
  setTimeout(function () {
    console.log(this.x);
  }, 0);
}
new Foo();
\`\`\`

Give output and one-sentence reason. Then: which this binding rule applies to the setTimeout callback? (If you see Object { x: 10 } in console, that can be a DevTools artifact — the mentor explains why.)`,
    solution: `**Output: undefined.**

**Step-by-step:** (1) new Foo() creates a new object; this inside Foo points to it; this.x = 10. (2) You pass a **normal function** to setTimeout, not bound. (3) setTimeout internally does something like \`callback()\` — not obj.callback(). So **default binding** applies. (4) Inside the callback, this = undefined (strict) or window (non-strict). this.x → undefined. Constructor binding does NOT flow into callbacks.

**Fix:** Use arrow function: \`setTimeout(() => { console.log(this.x); }, 0);\` — arrow captures this from Foo. Or \`setTimeout(function () { console.log(this.x); }.bind(this), 0);\`.

**If you saw Object { x: 10 } in console:** (A) You might have logged \`this\` instead of \`this.x\` — DevTools shows object by reference and can mislead. (B) In Node, this in setTimeout is a Timeout object, not window. Run \`"use strict";\` plus \`console.log("this === undefined:", this === undefined); console.log("this.x:", this && this.x);\` — you should see this.x: undefined. **Golden rule:** setTimeout executes its callback as a normal function, so constructor binding is lost unless this is lexically captured or explicitly bound. **Which rule?** Default binding.`,
    tags: ["this", "setTimeout", "default binding", "arrow function"],
  },
  {
    id: "closure-fn1-fn2",
    title: "Closure — fn1 vs fn2, where is count stored?",
    section: "core-js",
    difficulty: "medium",
    question: `\`\`\`js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}
const fn1 = outer();
const fn2 = outer();
fn1(); // ?
fn1(); // ?
fn2(); // ?
fn1(); // ?
\`\`\`

Interviewer asks: (1) What is the output? (2) Why does fn2 not continue from fn1? (3) Where is count stored in memory? (Answer verbally first; "stack" for count is wrong.)`,
    solution: `**Output: 1, 2, 1, 3.**

**Why fn2 does not continue from fn1:** Each invocation of outer() creates a new lexical environment with its own \`count\`. fn1 and fn2 close over different instances of count, so they don't share state. Key phrase: "Closures are created per function invocation, not per function definition."

**Where is count stored?** Not on the stack. Count is stored in the **heap**, inside the closure (lexical environment) referenced by inner. Why not stack? Stack memory is destroyed when outer() finishes execution, but count survives after outer() returns — so it cannot be on the stack. When outer() returns inner, the JS engine keeps the lexical environment alive in heap memory because it's still referenced by inner.

**Mental model:** fn1 → Closure → { count: 0 }; fn2 → Closure → { count: 0 }. Two separate boxes, same code, different memory.`,
    tags: ["closure", "heap", "per-invocation"],
  },
  {
    id: "loop-var-setTimeout",
    title: "Loop + var + setTimeout — output and 4 fixes",
    section: "core-js",
    difficulty: "medium",
    question: `\`\`\`js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
\`\`\`

(1) What is the output? (2) Why? (3) Give at least two different fixes (not just let). Then: in one line, why does let fix it but var does not?`,
    solution: `**Why it breaks:** var is function-scoped; only one \`i\` exists. The loop finishes first → i === 3. All callbacks run later and all closures read the same i. **Output: 3, 3, 3.**

**Fix 1 — let:** \`for (let i = 0; i < 3; i++) { ... }\` — let is block-scoped; each iteration creates a new binding; each callback closes over a different i.

**Fix 2 — IIFE:** Create a new scope per iteration: \`(function (j) { setTimeout(() => console.log(j), 1000); })(i);\` — j is a function parameter, new execution context per loop, each timeout closes over its own j.

**Fix 3 — setTimeout third argument:** \`setTimeout((j) => console.log(j), 1000, i);\` — i is copied into argument j; no closure over shared i.

**Fix 4 — bind:** \`setTimeout(console.log.bind(null, i), 1000);\`

**Interview strategy:** If you forget syntax, say: "We need to create a new scope per iteration so each callback captures a different value," then implement any one fix. **Why let fixes it:** let is block-scoped, so each iteration creates a new binding of i; each callback closes over its own i. With var, all callbacks share the same variable.`,
    tags: ["closure", "var vs let", "setTimeout", "IIFE"],
  },

  // ——— JS Utilities ———
  {
    id: "debounce",
    title: "Implement debounce (and why timerId + clearTimeout)",
    section: "js-utilities",
    difficulty: "medium",
    question: `Implement a debounce function. Requirements: accept a function fn and delay d; return a new function; fn should execute only after d ms have passed since the last call. Example: debounced(); debounced(); debounced(); → "fire" only once after 300ms. Preserve this and arguments.

Explain approach before coding. Mention closures. **Common mistakes:** (1) timerId inside the returned function — then every call creates a new timer and previous timers are never cancelled. (2) clearTimeout inside the setTimeout callback — the timeout has already fired; we must clear the *previous* timeout *before* creating a new one.

**Follow-up:** Why did we store \`this\` in \`context\`? Why don't we need it with an arrow function in setTimeout?`,
    solution: `**Correct implementation:**

\`\`\`js
function debounce(fn, delay) {
  let timerId; // shared via closure
  return function (...args) {
    const context = this;
    clearTimeout(timerId); // cancel previous call
    timerId = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
\`\`\`

**Why this works:** The timerId is stored in the closure so all invocations share the same timeout. Each call clears the previous timer and schedules a new one, ensuring the function executes only after calls stop for the given delay. **Arrow variant:** Use \`setTimeout(() => { fn.apply(this, args); }, delay)\` — then you don't need \`const context = this\` because the arrow lexically captures this.

**Why store this in context?** The callback passed to setTimeout is a normal function; when called it uses default binding (this = window/undefined). So we must manually preserve the outer function's this and pass it to fn via fn.apply(context, args). **Why arrow doesn't need it:** Arrow functions do not create their own this; they inherit this from the surrounding scope (the returned function). So this inside the arrow === this of the returned function. **One-liner:** "We store this in context because the setTimeout callback runs with default binding, whereas arrow functions lexically capture this from the enclosing scope."

**Complexity:** Time O(1) per call, Space O(1).`,
    codeSnippet: `function debounce(fn, delay) {\n  let timerId;\n  return function (...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}`,
    tags: ["debounce", "closure", "this", "setTimeout"],
  },
  {
    id: "debounce-vs-throttle",
    title: "Debounce vs throttle",
    section: "js-utilities",
    difficulty: "easy",
    question: `Answer conceptually (no code): (1) What is the difference between debounce and throttle? (2) In which UI scenario would you use debounce instead of throttle?`,
    solution: `**Difference (FAANG-ready):** Debounce delays execution until a certain period of **inactivity** has passed. Throttle ensures a function executes **at most once** in a given time window, regardless of how many times it's triggered.

**UI:** Use debounce for search input (wait until user stops typing). Use throttle for scroll/resize handlers (limit how often the handler runs).`,
    tags: ["debounce", "throttle", "UI"],
  },
  {
    id: "throttle-leading",
    title: "Implement throttle (leading edge)",
    section: "js-utilities",
    difficulty: "medium",
    question: `Implement throttle(fn, delay). Leading edge: execute immediately on first call; ignore further calls until delay has passed. Preserve this and arguments.

Before coding, answer: (1) Should the function run immediately on first call or after the delay? (2) If calls keep happening during the delay, should the last call be remembered or ignored? Choose and justify. **Common bug:** Typo \`isThrottle = true\` instead of \`isThrottled = true\` — then throttle never actually throttles. Also: set the lock only when you actually execute; don't schedule setTimeout on every call.`,
    solution: `**Correct leading-edge throttle:**

\`\`\`js
function throttle(fn, delay) {
  let isThrottled = false;
  return function (...args) {
    if (isThrottled) return;
    fn.apply(this, args);
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, delay);
  };
}
\`\`\`

**Why we don't need \`const context = this\` here:** We're not calling fn inside setTimeout; we call fn immediately inside the returned function, so this is correct. We only need to preserve this when the function runs inside an async callback (e.g. debounce's setTimeout). **Bugs to avoid:** (1) Typo isThrottle vs isThrottled. (2) Setting isThrottled and scheduling setTimeout outside the \`if (!isThrottled)\` block — then every call schedules a timer and the lock never works correctly. **Complexity:** O(1) per call, O(1) space.`,
    codeSnippet: `function throttle(fn, delay) {\n  let isThrottled = false;\n  return function (...args) {\n    if (isThrottled) return;\n    fn.apply(this, args);\n    isThrottled = true;\n    setTimeout(() => { isThrottled = false; }, delay);\n  };\n}`,
    tags: ["throttle", "leading edge", "closure"],
  },
  {
    id: "throttle-leading-trailing",
    title: "Throttle — leading + trailing (why extra state)",
    section: "js-utilities",
    difficulty: "hard",
    question: `Throttle that runs immediately AND runs once more with the **last** arguments after the delay ends. (1) What extra state would you need? (2) Why can't you just run fn inside setTimeout with current args? (Timeline: t=0 throttled("A"), t=200 "B", t=400 "C" — trailing should run with "C", not "A".)`,
    solution: `**Why you need extra state:** The setTimeout closes over the **first** call's args. So if you do \`setTimeout(() => { fn.apply(this, args); isThrottled = false; }, delay)\`, the trailing execution uses the **first** invocation's args, not the latest. Without extra state you'd run the first call twice (leading + trailing with same args). To implement correct trailing behavior you must: (1) Remember that another call happened, (2) Remember the latest arguments (and context), (3) Run only once with the latest data. So we need \`lastArgs\`, \`lastContext\` (and optionally a flag).

**Minimal state:** \`let lastArgs = null; let lastContext = null;\`. When throttled, update lastArgs and lastContext and return. When delay ends: if lastArgs exists, run \`fn.apply(context, lastArgs)\`, clear state, then set isThrottled = false. **One-liner:** "We need extra state because the trailing execution must use the latest invocation, not the one that started the throttle window."`,
    tags: ["throttle", "trailing", "state", "closure"],
  },
  {
    id: "once",
    title: "Implement once() — sync and async",
    section: "js-utilities",
    difficulty: "medium",
    question: `Implement once(fn). Requirements: fn executes only once; subsequent calls return the same result; preserve this and arguments.

**Follow-ups:** (1) What if fn returns a promise? Will your implementation work? Will multiple calls share the same promise? Is that desirable? (2) What if the promise rejects — should future calls retry or keep returning the rejected promise? (3) How would you modify once() so it retries if the promise rejects but still runs only once on success?`,
    solution: `**Sync implementation:** Closure with \`called\` and \`result\`. If called return result; else result = fn.apply(this, args), called = true, return result.

**If fn returns a promise:** Caching the promise is correct. Multiple callers can share the same promise and get the same eventual result (one network request, no race). Desirable for config loading, initialization, feature flags, auth bootstrap — this is how React Query, SWR, Apollo work. **If the promise rejects:** Two valid designs. (A) Strict once: cache even failures; future calls get the same rejected promise. (B) Retry on failure: only mark called = true on resolve; on reject, reset state so the next call retries.

**Retry-on-failure once (concept):** Update \`called\` to true only when the promise **resolves**. If it rejects, set result = null (or don't set called) so the next call runs fn again. Store the in-flight promise so multiple callers during the first attempt still share the same promise. **Interview one-liner:** "For async once, we cache the in-flight promise and only mark execution as complete on successful resolution; failures reset state to allow retry."`,
    tags: ["once", "closure", "promise", "cache"],
  },
  {
    id: "memoize",
    title: "Implement memoize() — cache key and limitations",
    section: "js-utilities",
    difficulty: "hard",
    question: `Implement memoize(fn). Cache results by arguments; same arguments return cached result. Preserve this.

Before coding, answer verbally: (1) How will you create a cache key from arguments? (2) Where will the cache be stored? (3) What are the limitations? (JSON.stringify loses types and has object order issues.) **Follow-up:** What if func returns a Promise? Will you cache the promise? What if it rejects?`,
    solution: `**Cache key:** Don't use JSON.stringify — loses type distinction (1 vs "1"), order issues for objects, fails for functions/symbols/circular refs. **Interview-safe approach:** Nested Map (Map-trie). Each argument is a key; traverse/build path; store result at leaf (e.g. using Symbol('RESULT') so no collision with user args). This preserves types and reference equality for objects.

**Where to store:** In a closure so the cache persists across calls but is private and garbage-collectable when the function is dropped.

**Limitations:** (1) Memory growth — cache grows indefinitely. (2) Referential equality — objects compared by reference; {a:1} !== {a:1}. (3) Only pure functions — not safe for I/O, randomness, or time. (4) Cache invalidation is hard. **If func returns a Promise:** Caching the promise is correct; all callers share the same async work. If it rejects, you might want to evict that cache entry so a future call can retry. **Interview summary:** "I'd use a Map-based cache in a closure. For robust memoization I'd avoid stringifying arguments and use nested Maps to preserve type and reference equality. Main limitations are memory growth and the requirement that the function be pure."`,
    codeSnippet: `// Map-trie: let node = root; for (const arg of args) { if (!node.has(arg)) node.set(arg, new Map()); node = node.get(arg); } then node.set(SYMBOL_RESULT, fn.apply(this, args));`,
    tags: ["memoize", "cache", "Map", "pure function"],
  },

  // ——— Promises ———
  {
    id: "promise-all-polyfill",
    title: "Promise.all polyfill",
    section: "promises",
    difficulty: "medium",
    question: `Implement a simple Promise.all polyfill. Requirements: accept an array of promises (or values); resolve with an array of results **in order**; reject immediately if any promise rejects. Example: promiseAll([p1, p2, p3]).then(console.log).

Think about edge cases: empty array, non-promise values. **Common bug:** resolve(data) instead of resolve(result) — Promise.all must resolve with the full result array, not the last value.`,
    solution: `**Correct implementation:**

\`\`\`js
function promiseAll(promises) {
  const result = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          result[index] = data;
          count++;
          if (count === promises.length) {
            resolve(result); // NOT resolve(data)
          }
        })
        .catch(reject);
    });
  });
}
\`\`\`

**Explanation:** We track how many promises have resolved, store results by index to preserve order, and resolve only when all complete. Any rejection short-circuits the entire promise. Use Promise.resolve(promise) to handle non-promise values. **Empty array:** Must resolve([]) immediately. **Complexity:** Time O(n), Space O(n).`,
    codeSnippet: `if (count === promises.length) resolve(result); // not resolve(data)`,
    tags: ["Promise.all", "polyfill", "order", "edge case"],
  },
  {
    id: "promise-all-vs-allSettled",
    title: "Promise.all vs Promise.allSettled",
    section: "promises",
    difficulty: "easy",
    question: `How is Promise.all different from Promise.allSettled? In what scenario would you prefer Promise.allSettled? (Answer in a few lines.)`,
    solution: `**Behavior:** Promise.all short-circuits on the first rejection. Promise.allSettled waits for all promises to settle and always resolves with an array of outcomes: \`{ status: "fulfilled", value }\` or \`{ status: "rejected", reason }\`.

**When to use allSettled:** When partial success is acceptable — e.g. logging, analytics, retry workflows where you need to know which succeeded and which failed. **Polished answer:** "Promise.all short-circuits on the first rejection, whereas Promise.allSettled waits for all promises to settle and always resolves with their individual outcomes. allSettled is useful when partial success is acceptable, such as logging, analytics, or retry workflows."`,
    tags: ["Promise.all", "Promise.allSettled", "async"],
  },
  {
    id: "retry",
    title: "Retry mechanism with optional delay",
    section: "promises",
    difficulty: "medium",
    question: `Implement retry(fn, n). Call fn; on failure retry up to n times; resolve if any attempt succeeds, reject only after all fail. Example: retry(fetchData, 3).then(...).catch(...).

**Follow-up:** How would you add a delay (e.g. exponential backoff) between retries? Why is retry usually implemented with a delay instead of immediate recursion?`,
    solution: `**Mental model:** "Try once → if it fails and retries remain → try again → else reject."

**Recursive solution:** \`return fn().catch((err) => { if (retries === 0) return Promise.reject(err); return retry(fn, retries - 1); });\` Or with new Promise: on success resolve; on catch, if retries === 0 reject(err), else retry(fn, retries - 1).then(resolve).catch(reject).

**With delay:** Wrap the recursive retry in setTimeout: \`setTimeout(() => { retry(fn, retries - 1, delay).then(resolve).catch(reject); }, delay);\` **Exponential backoff:** Use \`delay * 2\` (or similar) when calling retry for the next attempt. **Why delay:** To avoid overwhelming the server with repeated requests, especially when failures are due to load, rate limiting, or transient network issues. Used in API retries, token refresh, polling, upload retry, payment retry. **Interview one-liner:** "Yes, we can use setTimeout to delay retries. On failure we schedule the next attempt after a delay, optionally with exponential backoff to avoid overwhelming the server." **Complexity:** O(n) attempts, O(n) space (recursion stack).`,
    tags: ["retry", "promise", "backoff", "setTimeout"],
  },

  // ——— DOM & Browser ———
  {
    id: "event-delegation",
    title: "Implement event delegation",
    section: "dom-browser",
    difficulty: "medium",
    question: `Implement event delegation. Scenario: <ul> with many <li>; clicking any <li> should log its text; new <li> may be added dynamically. No frameworks. Explain the idea first, then code. Mention bubbling and why this is better than attaching a listener to each <li>.

**Common mistakes:** onclick={clickHandler(val)} is React syntax, not valid HTML; val doesn't exist in HTML — you must use the event object and event.target.`,
    solution: `**Core idea (say this first):** Instead of attaching event listeners to each child, we attach a single listener to a common parent and use **event bubbling** to determine which child was clicked.

**HTML:** <ul id="list"> with <li> items, no inline handlers. **JavaScript:**

\`\`\`js
const ul = document.getElementById("list");
ul.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    console.log(event.target.textContent);
  }
});
\`\`\`

**Why it works:** Click happens on <li> → event bubbles up to <ul> → ul's listener runs → event.target is the clicked <li>. **Why better:** One listener instead of many; handles dynamically added <li> without attaching new listeners; less memory; cleaner code. **Dynamic elements:** appendChild(newLi) — clicking the new item still works because the event bubbles to the same ul. **Interview polish:** "Event delegation works for dynamically added elements because the event bubbles up from the clicked child to the parent where the single listener is attached."`,
    tags: ["event delegation", "bubbling", "event.target"],
  },
  {
    id: "preventDefault-vs-stopPropagation",
    title: "preventDefault vs stopPropagation",
    section: "dom-browser",
    difficulty: "easy",
    question: `What is the difference between event.preventDefault() and event.stopPropagation()? Give one real-world example for each.`,
    solution: `**preventDefault():** Stops the **browser's default action** for the event. Examples: form submit (prevents page reload); <a> click (prevents navigation); right-click (prevent context menu).

**stopPropagation():** Stops the event from **propagating** further through the DOM (bubbling or capturing). **Example — modal:** Overlay has click → closeModal(). Modal div has click → e.stopPropagation(). Without it, clicking inside the modal would bubble to overlay and close the modal. So we call stopPropagation on the modal click so it doesn't reach the overlay. **Table:** preventDefault → browser default behavior; stopPropagation → event movement in DOM. They do completely different things. **One-liner:** "preventDefault stops the browser's default action; stopPropagation stops the event from bubbling or capturing through the DOM."`,
    tags: ["preventDefault", "stopPropagation", "modal", "bubbling"],
  },

  // ——— React ———
  {
    id: "react-synthetic-events",
    title: "How React handles events",
    section: "react",
    difficulty: "medium",
    question: `How does React handle events? What is a SyntheticEvent? Why is event delegation important in React? (Short direct answer first, then details.)`,
    solution: `**Short answer:** React uses a **Synthetic Event** system: events are wrapped around native browser events and handled through **event delegation at the root level**.

**SyntheticEvent:** A wrapper around the native event; normalizes behavior across browsers; same API (preventDefault, stopPropagation, etc.). When you do onClick={handleClick}, the \`e\` in handleClick is a SyntheticEvent, not the raw DOM event.

**Delegation:** React does NOT attach one listener per element. It attaches **one listener per event type** at the root container. Uses event bubbling; when an event fires, the root listener catches it and React maps it to the correct component/handler. **Benefits:** Better performance, less memory, works with dynamic updates. **Bubbling:** Still exists — parent and child onClick both fire (child then parent); stopPropagation() still works. **Event pooling:** Removed in React 17; if asked, say "No, event pooling was removed in React 17."

**One-liner:** "React uses a Synthetic Event system built on native events and relies on event delegation at the root level to improve performance and consistency across browsers."`,
    tags: ["SyntheticEvent", "event delegation", "React 17"],
  },

  // ——— Concepts ———
  {
    id: "context-const-this",
    title: "Why const context = this in debounce?",
    section: "concepts",
    difficulty: "medium",
    question: `In debounce, why do we write \`const context = this\` before setTimeout? Why don't we need it when we use an arrow function inside setTimeout?`,
    solution: `**Problem:** The callback we pass to setTimeout is a **normal function**. When setTimeout runs it, it does something like \`callback()\` — so default binding applies. So \`this\` inside that callback is window/undefined, not the \`this\` of the outer (returned) function. If we did \`fn.apply(this, args)\` inside the timeout, we'd be passing the wrong this. **Fix:** Capture the correct this when the returned function runs (where this is correct, e.g. obj when called as obj.onResize()) in a variable: \`const context = this\`, then inside the timeout use \`fn.apply(context, args)\`. This works because of closures.

**Why arrow doesn't need it:** Arrow functions don't have their own this; they lexically inherit this from the enclosing scope (the returned function). So this inside the arrow is the same as this in the returned function. No async boundary, no loss of this. **Mental model:** Normal function in setTimeout → "Who called me?" → default binding. Arrow in setTimeout → "What was this where I was defined?" → outer function's this. **One-liner:** "We store this in context because the setTimeout callback runs with default binding, whereas arrow functions lexically capture this from the enclosing scope."`,
    tags: ["this", "setTimeout", "arrow function", "closure"],
  },
  {
    id: "let-vs-var-loop",
    title: "Why let fixes the loop closure",
    section: "concepts",
    difficulty: "easy",
    question: `In one line: Why does let fix the for-loop + setTimeout closure problem but var does not?`,
    solution: `**Answer:** let is block-scoped, so each iteration of the loop creates a **new binding** of i. Each callback closes over its own i. With var there is only one i (function-scoped), shared by all callbacks; by the time they run, the loop has finished and i is 3. **Polished:** "let is block-scoped, so each iteration creates a new binding of i. Each callback closes over its own i, whereas with var all callbacks share the same variable."`,
    tags: ["let", "var", "block scope", "closure"],
  },

  // ——— Promise.race, any, allSettled, finally ———
  {
    id: "promise-race-polyfill",
    title: "Promise.race polyfill",
    section: "promises",
    difficulty: "medium",
    question: `Implement Promise.race. Requirements: accept an iterable (array); return a new Promise; settle as soon as any input settles; preserve first-settled result; handle non-promise values.

Before coding, answer: (1) What happens if the array is empty? (2) What if a value is not a promise? (3) Why is Promise.resolve important? **Common bugs:** Using Promise(p) instead of Promise.resolve(p) — Promise(5) is TypeError. Empty array must stay **pending**, not resolve.`,
    solution: `**Empty array:** Promise.race([]) returns a promise that stays **pending forever** — there is no promise to race. Do NOT special-case empty array to resolve; let the returned promise remain pending.

**Non-promise values:** Wrap with Promise.resolve(p) so plain values and thenables participate. Promise.resolve(42) resolves immediately and wins the race.

**Why Promise.resolve:** It normalizes values so we can treat promises and non-promises uniformly (plain values → resolved promises, thenables → real promises, consistent .then handling).

**Correct implementation:**

\`\`\`js
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (let p of promises) {
      Promise.resolve(p).then(resolve).catch(reject);
    }
  });
}
\`\`\`

No empty-array handling. First settlement calls resolve or reject; further settlements are ignored by Promise semantics. **Can Promise.race resolve even if others later reject?** Yes — once settled, subsequent resolve/reject are ignored.`,
    tags: ["Promise.race", "polyfill", "empty array", "Promise.resolve"],
  },
  {
    id: "promise-any-polyfill",
    title: "Promise.any polyfill",
    section: "promises",
    difficulty: "hard",
    question: `Implement Promise.any. Behavior: resolves with the first **fulfilled** promise; ignores rejections; rejects only if **all** reject, with AggregateError(errors). Example: Promise.any([Promise.reject("a"), Promise.resolve("ok")]).then(console.log) → "ok".

Before coding: How is Promise.any different from Promise.race? What state do we need? When do we reject?`,
    solution: `**Difference:** Promise.race settles as soon as the first promise settles (fulfill or reject). Promise.any ignores rejections and resolves as soon as the first promise **fulfills**; it only rejects if all reject, then throws AggregateError with all reasons.

**State:** Track rejection count, collected errors array, total count. Reject only when rejectedCount === total; then reject(new AggregateError(errors, "All promises were rejected")). Preserve order of errors by index. Empty array → reject immediately with AggregateError([], ...).

**Why wait for all rejections in any but not in race?** Promise.any must wait because a fulfillment may still occur later; race is designed to settle as soon as the first promise settles regardless of outcome.`,
    codeSnippet: `promises.forEach((p, index) => {\n  Promise.resolve(p)\n    .then(resolve)\n    .catch((err) => {\n      errors[index] = err;\n      rejectedCount++;\n      if (rejectedCount === total) reject(new AggregateError(errors, "..."));\n    });\n});`,
    tags: ["Promise.any", "AggregateError", "polyfill"],
  },
  {
    id: "promise-allSettled-polyfill",
    title: "Promise.allSettled polyfill",
    section: "promises",
    difficulty: "medium",
    question: `Implement promiseAllSettled(promises). Waits for all to settle; always resolves; returns array of { status: "fulfilled", value } or { status: "rejected", reason }; preserve **input order** (use index, not push).

Common bugs: Empty array must return Promise.resolve([]). Check count === length **inside** .then/.catch (or .finally), not synchronously. Use result[index] = ... to preserve order. Status string is "rejected" not "reject".`,
    solution: `**State:** Array of results (by index), settled count. Resolve when count === promises.length. Use .finally(() => { count++; if (count === promises.length) resolve(result); }) so both fulfill and reject increment and resolve. **Order:** result[index] = { status: "fulfilled", value } or { status: "rejected", reason }. Empty array: return Promise.resolve([]).

**Why preserve order?** Callers rely on positional meaning — each result corresponds to a specific request; losing order breaks the association between requests and outcomes.`,
    tags: ["Promise.allSettled", "polyfill", "order", "finally"],
  },
  {
    id: "promise-finally-polyfill",
    title: "Promise.finally polyfill",
    section: "promises",
    difficulty: "hard",
    question: `Implement Promise.prototype.finally(callback). Behavior: runs regardless of fulfill/reject; does not receive value/reason; passes through original value/reason; if callback returns a promise, chain waits; if callback throws, that overrides.

Why must we use this.then(...) and not Promise.resolve(callback())?`,
    solution: `**Why this.then:** finally must attach to the **existing** promise instance and observe both its resolution and rejection; only \`then(onFulfilled, onRejected)\` can do that. If we used Promise.resolve(callback()) we would ignore the original promise and lose its value/reason/timing. **Mental model:** finally is "run this side-effect, then pass the original result through unchanged."

**Implementation:**

\`\`\`js
Promise.prototype.finally = function (callback) {
  return this.then(
    value => Promise.resolve(callback()).then(() => value),
    reason => Promise.resolve(callback()).then(() => { throw reason; })
  );
};
\`\`\`

Success path: run callback, wait for it, return original value. Failure path: run callback, wait, rethrow original reason. If callback throws or returns rejected promise, that overrides. **One-liner:** finally runs regardless of outcome, waits for its callback, then passes through the original value or error unless the callback itself fails.`,
    tags: ["Promise.finally", "polyfill", "this.then", "pass-through"],
  },

  // ——— React hooks & memo ———
  {
    id: "usecallback-trap",
    title: "useCallback trap — counter only increments once",
    section: "react",
    difficulty: "medium",
    question: `Consider:

\`\`\`js
function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = React.useCallback(() => { setCount(count + 1); }, []);
  return (<div><p>{count}</p><button onClick={increment}>+</button></div>);
}
\`\`\`

(1) What happens when you click the button multiple times? (2) Why? (3) Give two correct fixes.`,
    solution: `**Behavior:** Count increases only once (e.g. 0 → 1, then stays 1). **Why:** useCallback with [] returns the same function instance across renders. The callback closes over \`count\` from the **initial** render (0). So increment is effectively \`() => setCount(0 + 1)\` and never updates. On every click it calls setCount(1). **Interview one-liner:** The callback captures a stale value of count because it was memoized with an empty dependency array.

**Fix 1:** Add count to deps: \`useCallback(() => setCount(count + 1), [count])\`. **Fix 2 (preferred):** Functional update: \`useCallback(() => setCount(prev => prev + 1), [])\` — no stale closure, safe with concurrent rendering, no dependency on count. **Bonus:** Functional update is better because it avoids stale closures and doesn't require count in the dependency array.`,
    tags: ["useCallback", "stale closure", "functional update"],
  },
  {
    id: "usememo-trap",
    title: "useMemo trap — expensiveValue never updates",
    section: "react",
    difficulty: "medium",
    question: `Consider:

\`\`\`js
const expensiveValue = React.useMemo(() => { console.log("computing..."); return count * 2; }, []);
\`\`\`

(1) What happens when you click + multiple times? (2) When you type in an input? (3) Why is this wrong? (4) Correct fix. **Bonus:** Should useMemo be used to prevent re-renders?`,
    solution: `**Click +:** count state increases but expensiveValue stays 0 (computed once with count=0). **Type in input:** text updates, component re-renders, but useMemo does NOT recompute (deps []), so expensiveValue stays stale. **Why wrong:** useMemo with [] captures the initial count; the memoized value never recomputes → stale derived state. **Fix:** Add count to deps: \`useMemo(() => count * 2, [count])\`.

**useMemo to prevent re-renders?** No. useMemo memoizes the **result** of an expensive computation, not to prevent re-renders. It has its own overhead (dependency comparison); using it for cheap calculations can hurt performance. **Key:** useMemo does not make your code correct — it only optimizes correct code.`,
    tags: ["useMemo", "stale closure", "dependencies"],
  },
  {
    id: "react-memo-trap",
    title: "React.memo trap — Child re-renders every click",
    section: "react",
    difficulty: "medium",
    question: `Consider:

\`\`\`js
const Child = React.memo(({ onClick }) => { ... });
function Parent() {
  const [count, setCount] = React.useState(0);
  return <><p>{count}</p><Child onClick={() => setCount(count + 1)} /></>;
}
\`\`\`

(1) Will Child re-render on every click? (2) Why? (3) Two fixes to prevent unnecessary re-renders. **Bonus:** Is it always good to wrap components in React.memo?`,
    solution: `**Yes,** Child re-renders on every click. **Why:** React.memo does shallow comparison of props. \`onClick={() => setCount(count + 1)}\` creates a **new function** every render → new reference → memoization fails. **One-liner:** React.memo only prevents re-renders when props are referentially equal; inline functions create new references every render.

**Fix 1 (best):** useCallback + functional update: \`const handleClick = React.useCallback(() => setCount(prev => prev + 1), []);\` then \`<Child onClick={handleClick} />\`. **Fix 2:** Pass setCount and do \`onClick={() => setCount(prev => prev + 1)}\` inside Child (setCount is stable). **React.memo always good?** No — it does shallow comparison on every render; if props change often or the component is cheap to render, the comparison overhead can outweigh benefits.`,
    tags: ["React.memo", "referential equality", "useCallback"],
  },
  {
    id: "reconciliation-keys",
    title: "Reconciliation & keys — why index is problematic",
    section: "react",
    difficulty: "medium",
    question: `List: \`{items.map((item, index) => <li key={index}>{item}</li>)}\`. (1) Why is using index as key problematic? (2) Give a real bug. (3) When is index as key acceptable? (4) Best possible key?`,
    solution: `**Why problematic:** Keys define **identity** during reconciliation. When items are inserted or removed, indices shift — React reuses DOM nodes incorrectly and state/inputs attach to wrong items. **Real bug:** Input list with key={index}; type in second input, then delete first item → typed text and focus move to wrong row. Same for checkboxes, animations.

**When index is acceptable:** Only if list is static, no insertions/deletions/reordering, and no local state inside list items (e.g. static labels ["Mon","Tue","Wed"]). **Best key:** A stable, unique identifier intrinsic to the data (e.g. item.id). **Summary:** Using index as key is problematic because keys define identity; when items are inserted or removed, indices change, causing React to reuse DOM nodes incorrectly and bugs like state moving between items.`,
    tags: ["reconciliation", "keys", "index", "identity"],
  },
  {
    id: "useeffect-vs-uselayouteffect",
    title: "useEffect vs useLayoutEffect",
    section: "react",
    difficulty: "medium",
    question: `(1) When does each run? (2) When would you prefer useLayoutEffect? (3) Why is useLayoutEffect considered risky?`,
    solution: `**When they run:** useEffect runs **after** the browser has painted (non-blocking). useLayoutEffect runs **after** DOM updates but **before** paint (synchronous, blocks painting). **Timeline:** Render → DOM updated → useLayoutEffect → Paint → useEffect.

**When useLayoutEffect:** Only when you must read or write layout before the screen updates — e.g. measuring element size/position, fixing scroll position, preventing visual flicker, animations that must start before paint. If you used useEffect for measurement you'd get a flicker. **Why risky:** It blocks the browser paint; heavy logic inside can cause jank. **Rule of thumb:** Use useEffect by default; useLayoutEffect only when you must read/write layout before paint.`,
    tags: ["useEffect", "useLayoutEffect", "paint", "layout"],
  },
  {
    id: "useeffect-setstate-empty-deps",
    title: "useEffect with setState and empty deps",
    section: "react",
    difficulty: "medium",
    question: `Consider:

\`\`\`js
React.useEffect(() => { console.log("effect", count); setCount(count + 1); }, []);
\`\`\`

(1) What happens when the component renders? (2) Infinite loop? (3) What is printed in the console? **Trap:** If we use setCount(prev => prev + 1), does behavior change?`,
    solution: `**What happens:** Initial render: count=0, div shows 0. After paint, effect runs (because []): logs "effect 0", calls setCount(1) → schedules re-render. Second render: count=1, div shows 1. Effect does NOT run again (empty deps). **Infinite loop?** No — state updates do not cause the effect to re-run unless the dependency array includes the updated value. **Console:** "effect 0" (not "effect 1") — the effect runs with the value from the render it was created in (count=0). **setCount(prev => prev + 1):** Behavior is the same — effect still runs once; functional update only changes how the new value is calculated, not when the effect runs.`,
    tags: ["useEffect", "empty deps", "stale closure"],
  },

  // ——— Event loop ———
  {
    id: "event-loop-basic",
    title: "Event loop — output order (microtasks vs macrotasks)",
    section: "event-loop",
    difficulty: "medium",
    question: `What is the exact output order?

\`\`\`js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C")).then(() => console.log("D"));
console.log("E");
\`\`\`

Explain: call stack → microtask → macrotask.`,
    solution: `**Output:** A, E, C, D, B.

**Why:** (1) Synchronous code runs first: A, E. (2) Promise .then callbacks go to microtask queue; setTimeout goes to macrotask queue. (3) Event loop drains **microtasks** before macrotasks: C, D. (4) Then macrotask: B. **Priority:** Call stack → Microtask queue → Macrotask queue. Microtasks (promises) run before macrotasks (setTimeout).`,
    tags: ["event loop", "microtask", "macrotask"],
  },
  {
    id: "event-loop-nested",
    title: "Event loop — microtasks inside macrotask",
    section: "event-loop",
    difficulty: "hard",
    question: `Output order?

\`\`\`js
console.log("A");
setTimeout(() => { console.log("B"); Promise.resolve().then(() => console.log("C")); }, 0);
Promise.resolve().then(() => { console.log("D"); setTimeout(() => console.log("E"), 0); });
console.log("F");
\`\`\`

**Rule:** After every macrotask, the event loop drains the **entire** microtask queue before the next macrotask.`,
    solution: `**Output:** A, F, D, B, C, E.

**Steps:** (1) Sync: A, F. (2) Microtasks: D (and while running D, setTimeout(E) is scheduled as macrotask). (3) First macrotask: B (first setTimeout). While running B, Promise.then(C) is queued as microtask. (4) **Microtasks run immediately after each macrotask** — so C runs before next macrotask. (5) Next macrotask: E. **Golden rule:** After every macrotask, drain the entire microtask queue before moving to the next macrotask.`,
    tags: ["event loop", "microtask", "macrotask", "nested"],
  },
  {
    id: "event-loop-return-promise",
    title: "Event loop — return Promise.resolve in .then",
    section: "event-loop",
    difficulty: "hard",
    question: `Output order?

\`\`\`js
setTimeout(() => console.log("A"), 0);
Promise.resolve().then(() => { console.log("B"); return Promise.resolve("C"); }).then(val => console.log(val));
queueMicrotask(() => console.log("D"));
console.log("E");
\`\`\`

**Rule:** A .then() attached to a promise **returned inside** a microtask is queued after that microtask completes (at the end of the microtask queue).`,
    solution: `**Output:** E, B, D, C, A.

**Why:** Sync: E. Microtasks queued in order: first .then (B + return Promise), queueMicrotask(D). Execute first microtask: B; returning Promise.resolve("C") queues the second .then (C) **after** current microtask — so microtask queue becomes [D, C]. Then D, then C. Macrotask: A. **One-liner:** Microtasks run in FIFO order; microtasks scheduled during another microtask are appended to the end of the queue.`,
    tags: ["event loop", "microtask", "queueMicrotask"],
  },
  {
    id: "event-loop-async-await",
    title: "Event loop — async/await and microtasks",
    section: "event-loop",
    difficulty: "medium",
    question: `Output order?

\`\`\`js
async function test() { console.log("A"); await Promise.resolve(); console.log("B"); }
console.log("C");
test();
Promise.resolve().then(() => console.log("D"));
console.log("E");
\`\`\`

Explain async/await in terms of microtasks.`,
    solution: `**Output:** C, A, E, B, D.

**Why:** Sync: C, then test() runs — inside test: A, then await Promise.resolve() pauses and schedules the rest (B) as a microtask. Back to global: .then(D) queued, E. So sync: C, A, E. Microtasks: B was queued first (continuation of test), then D. So B, D. **Key rule:** Code after await runs as a microtask. await is syntax sugar for .then(); code after await runs as a microtask. **One-liner:** async/await pauses execution and schedules the remaining code as a microtask, which runs after synchronous code but before macrotasks.`,
    tags: ["event loop", "async/await", "microtask"],
  },

  // ——— JS: bind polyfill ———
  {
    id: "bind-polyfill",
    title: "Function.prototype.bind polyfill",
    section: "js-utilities",
    difficulty: "hard",
    question: `Implement myBind. Must handle: (1) explicit this binding, (2) partial arguments (bind-time + call-time), (3) **new**: when bound function is called with new, bound this is ignored and this is the new instance; prototype chain must work (e.g. p instanceof Person).

Common bugs: thisArg must be captured at bind time, not call time. Inside returned function, \`this\` is not the original function — store it as \`const originalFn = this\`. Merge bindArgs and callArgs. For new: detect via \`this instanceof boundFn\`, then use \`this\` as context; set \`boundFn.prototype = Object.create(originalFn.prototype)\`.`,
    solution: `**Step 1:** Capture original function: \`const originalFn = this;\` (this is the function myBind was called on). **Step 2:** Return function that applies originalFn with thisArg and merged args: \`return function (...callArgs) { return originalFn.apply(thisArg, [...bindArgs, ...callArgs]); };\`. **Step 3 (new):** If called with new, ignore thisArg: \`const isNewCall = this instanceof boundFn;\` \`const context = isNewCall ? this : thisArg;\` and \`boundFn.prototype = Object.create(originalFn.prototype);\` so instanceof works.

**One-liner:** bind returns a new function that permanently binds this and partially applies arguments, but when used with new the bound this is ignored to preserve constructor semantics. **Does new override bound this?** Yes — when a bound function is called with new, the newly created object becomes this.`,
    codeSnippet: `function boundFn(...callArgs) {\n  const isNewCall = this instanceof boundFn;\n  const context = isNewCall ? this : thisArg;\n  return originalFn.apply(context, [...bindArgs, ...callArgs]);\n}\nboundFn.prototype = Object.create(originalFn.prototype);`,
    tags: ["bind", "polyfill", "new", "prototype"],
  },

  // ——— System design ———
  {
    id: "autocomplete-system-design",
    title: "Autocomplete / search suggestions — system design",
    section: "system-design",
    difficulty: "hard",
    question: `Design an autocomplete (e.g. Google search). Requirements: suggestions as user types; API is expensive; fast and responsive; handle debouncing, caching, race conditions, loading & error states.

High-level: main pieces? Immediate problems? Then: (1) How prevent stale results when multiple requests in flight? (2) If API is very slow? (3) How limit cache size? (4) Keyboard nav: where store highlighted index? How reduce re-renders? What accessibility?`,
    solution: `**Main pieces:** Input component (query state); Debounce layer (e.g. 300ms inactivity); Cache (Map: query → suggestions); Network layer (fetch, errors, retries); Suggestion list UI (loading, empty); **Race-condition guard** (request ID or AbortController).

**Problems:** Race conditions (request 1 returns after request 3 → stale UI); too many requests; loading/empty states; error handling. **Stale results:** Request ID — increment per request, only update UI if response ID === latest ID. Or AbortController — cancel previous request when new one starts. **Slow API:** Stale-while-revalidate — show cached result immediately, show loading for fresh data, update when response arrives (SWR, React Query pattern). **Cache size:** Cap size, evict with LRU (most recently used stay). **Keyboard nav:** Store highlighted index in state (or useRef for no re-render on arrow key). Reduce re-renders: split Input and SuggestionList, React.memo list items, useCallback for handlers. **Accessibility:** ARIA roles (combobox, listbox, option), aria-activedescendant, full keyboard (↑↓ Enter Esc). **Summary:** Debounce input, cache results, guard races with request ID or AbortController, stale-while-revalidate for slow API, LRU for cache limit, ARIA and keyboard for a11y.`,
    tags: ["autocomplete", "debounce", "cache", "race condition", "a11y"],
  },
  {
    id: "infinite-scroll-system-design",
    title: "Infinite scroll feed — system design",
    section: "system-design",
    difficulty: "hard",
    question: `Design a feed (Twitter/Instagram style). Requirements: load content as user scrolls; handle fast scrolling; avoid duplicate requests; slow network; preserve scroll position; performant on large lists.

High-level: main components (UI, state, data flow, network)? Key technical challenges?`,
    solution: `**UI/components:** FeedContainer (data fetching, cursor, loading/error); FeedList (items + sentinel at bottom); FeedItem (memoized); LoadTrigger/sentinel (invisible div at bottom, observed by IntersectionObserver). **State:** items (array); cursor/pageToken (next page); isLoading (prevent parallel fetches); hasMore; error. **Data flow:** User scrolls → sentinel enters viewport → IntersectionObserver fires → fetch next page (if !isLoading && hasMore) → append items, update cursor. **Key challenges:** Avoid duplicate requests (isLoading guard, cursor); handle fast scroll (debounce or throttle observer callback); preserve scroll position (don’t scroll jump when appending — use stable item keys, add to end); performance (virtualization for very long lists, React.memo for items). Use IntersectionObserver, not scroll events.`,
    tags: ["infinite scroll", "IntersectionObserver", "pagination", "virtualization"],
  },
  {
    id: "infinite-scroll-cursor-dedup-scroll",
    title: "Infinite scroll — cursor, duplicates, scroll position",
    section: "system-design",
    difficulty: "hard",
    question: `(1) What is a cursor and why use it instead of page numbers? (2) How do you prevent duplicate API calls when the user scrolls very fast? (3) How do you preserve scroll position when the user navigates away and comes back? (4) What if new items are inserted at the top while the user is away?`,
    solution: `**Cursor:** An opaque pointer returned by the backend that marks where the next page of data starts. "Give me items after this specific item" (e.g. cursor=post_99). **Why not page numbers:** Feeds change (new posts at top, deletes). Page numbers assume fixed positions → duplicates or missing items when boundaries shift. Cursor describes position by identity, not count — feeds need identity.

**Prevent duplicate requests:** (1) **isLoading guard** — before fetching, check if !isLoading && hasMore; set isLoading = true when starting request, false when done. Fast scroll fires observer multiple times but only first fire sends request. (2) **Cursor** — backend returns nextCursor; frontend sends it for next page; backend only returns items after that cursor. (3) **Frontend dedup by ID** — even if backend returns overlapping items, merge defensively: filter response items by !existingIds.has(id) before appending. **Request lifecycle:** Idle → Triggered → Loading (locked) → Success (update cursor, unlock) or Failure (unlock, allow retry).

**Preserve scroll position:** Store **both** scroll offset (scrollTop) and feed state (items, cursor, hasMore) when user leaves. On return: restore feed data first → wait for DOM to render → then scroll to saved position (e.g. useLayoutEffect or requestAnimationFrame). If you only restore scrollTop but reload feed from scratch, DOM height changes and position is wrong.

**New items at top while away:** User left at Post 5; when they return, new posts were added at top. Options: (1) Restore scroll position and loaded items so they see the same place; optionally show a "X new posts" banner and let them click to prepend. (2) Or reload from top and lose position — usually worse UX. The key is not to blindly reload and lose scroll + loaded state.`,
    tags: ["infinite scroll", "cursor", "dedup", "scroll position", "isLoading"],
  },
];
