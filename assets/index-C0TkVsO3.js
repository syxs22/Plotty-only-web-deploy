var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _commit_callbacks, _discard_callbacks, _pending, _blocking_pending, _deferred, _scheduled, _new_effects, _dirty_reactions, _skipped_branches, _unskipped_branches, _decrement_queued, _Batch_instances, is_deferred_fn, is_skipped_fn, resolve_fn, process_fn, traverse_fn, find_earlier_batch_fn, intersects_fn, merge_fn, defer_effects_fn, commit_fn, unlink_fn, _a, _anchor, _hydrate_open, _props, _children, _effect, _main_effect, _pending_effect, _failed_effect, _offscreen_fragment, _local_pending_count, _pending_count, _pending_count_update_queued, _dirty_reactions2, _effect_pending, _effect_pending_subscriber, _Boundary_instances, hydrate_resolved_content_fn, hydrate_failed_content_fn, create_reset_fn, is_destroyed_fn, hydrate_pending_content_fn, render_fn, resolve_fn2, run_fn, update_pending_count_fn, handle_error_fn, _batches, _onscreen, _offscreen, _outroing, _transition, _commit, _discard, _b;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link2 of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link2);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link2) {
    const fetchOpts = {};
    if (link2.integrity) fetchOpts.integrity = link2.integrity;
    if (link2.referrerPolicy) fetchOpts.referrerPolicy = link2.referrerPolicy;
    if (link2.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link2.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link2) {
    if (link2.ep)
      return;
    link2.ep = true;
    const fetchOpts = getFetchOpts(link2);
    fetch(link2.href, fetchOpts);
  }
})();
const DEV = false;
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var includes = Array.prototype.includes;
var array_from = Array.from;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
function is_function(thing) {
  return typeof thing === "function";
}
const noop = () => {
};
function run(fn) {
  return fn();
}
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
function deferred() {
  var resolve;
  var reject;
  var promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
const DERIVED = 1 << 1;
const EFFECT = 1 << 2;
const RENDER_EFFECT = 1 << 3;
const MANAGED_EFFECT = 1 << 24;
const BLOCK_EFFECT = 1 << 4;
const BRANCH_EFFECT = 1 << 5;
const ROOT_EFFECT = 1 << 6;
const BOUNDARY_EFFECT = 1 << 7;
const PAUSED = 1 << 8;
const CONNECTED = 1 << 9;
const CLEAN = 1 << 10;
const DIRTY = 1 << 11;
const MAYBE_DIRTY = 1 << 12;
const INERT = 1 << 13;
const DESTROYED = 1 << 14;
const REACTION_RAN = 1 << 15;
const DESTROYING = 1 << 25;
const EFFECT_TRANSPARENT = 1 << 16;
const EAGER_EFFECT = 1 << 17;
const HEAD_EFFECT = 1 << 18;
const EFFECT_PRESERVED = 1 << 19;
const USER_EFFECT = 1 << 20;
const EFFECT_OFFSCREEN = 1 << 25;
const REACTION_IS_UPDATING = 1 << 21;
const ASYNC = 1 << 22;
const ERROR_VALUE = 1 << 23;
const STATE_SYMBOL = Symbol("$state");
const COMPONENT_SYMBOL = Symbol("component");
const LEGACY_PROPS = Symbol("legacy props");
const LOADING_ATTR_SYMBOL = Symbol("");
const ATTRIBUTES_CACHE = Symbol("attributes");
const CLASS_CACHE = Symbol("class");
const STYLE_CACHE = Symbol("style");
const TEXT_CACHE = Symbol("text");
const STALE_REACTION = new class StaleReactionError extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "StaleReactionError");
    __publicField(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
const EACH_ITEM_REACTIVE = 1;
const EACH_INDEX_REACTIVE = 1 << 1;
const EACH_IS_CONTROLLED = 1 << 2;
const EACH_IS_ANIMATED = 1 << 3;
const EACH_ITEM_IMMUTABLE = 1 << 4;
const PROPS_IS_IMMUTABLE = 1;
const PROPS_IS_RUNES = 1 << 1;
const PROPS_IS_UPDATED = 1 << 2;
const PROPS_IS_BINDABLE = 1 << 3;
const PROPS_IS_LAZY_INITIAL = 1 << 4;
const TEMPLATE_FRAGMENT = 1;
const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
const HYDRATION_ERROR = {};
const UNINITIALIZED = Symbol("uninitialized");
const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
function derived_inert() {
  {
    console.warn(`https://svelte.dev/e/derived_inert`);
  }
}
function svelte_boundary_reset_noop() {
  {
    console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
  }
}
function equals(value) {
  return value === this.v;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}
function lifecycle_outside_component(name) {
  {
    throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
  }
}
function async_derived_orphan() {
  {
    throw new Error(`https://svelte.dev/e/async_derived_orphan`);
  }
}
function each_key_duplicate(a, b, value) {
  {
    throw new Error(`https://svelte.dev/e/each_key_duplicate`);
  }
}
function effect_in_teardown(rune) {
  {
    throw new Error(`https://svelte.dev/e/effect_in_teardown`);
  }
}
function effect_in_unowned_derived() {
  {
    throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
  }
}
function effect_orphan(rune) {
  {
    throw new Error(`https://svelte.dev/e/effect_orphan`);
  }
}
function effect_update_depth_exceeded() {
  {
    throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
  }
}
function props_invalid_value(key2) {
  {
    throw new Error(`https://svelte.dev/e/props_invalid_value`);
  }
}
function state_descriptors_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
  }
}
function state_prototype_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
  }
}
function state_unsafe_mutation() {
  {
    throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
  }
}
function svelte_boundary_reset_onerror() {
  {
    throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
  }
}
let legacy_mode_flag = false;
let tracing_mode_flag = false;
function enable_legacy_mode_flag() {
  legacy_mode_flag = true;
}
let component_context = null;
function set_component_context(context) {
  component_context = context;
}
function push(props, runes = false, fn) {
  component_context = {
    p: component_context,
    i: false,
    c: null,
    e: null,
    s: props,
    x: null,
    r: (
      /** @type {Effect} */
      active_effect
    ),
    l: legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
  };
}
function pop(component) {
  var context = (
    /** @type {ComponentContext} */
    component_context
  );
  var effects = context.e;
  if (effects !== null) {
    context.e = null;
    for (var fn of effects) {
      create_user_effect(fn);
    }
  }
  context.i = true;
  component_context = context.p;
  return mark_as_component(component);
}
function mark_as_component(component = {}) {
  define_property(component, COMPONENT_SYMBOL, { value: true });
  return component;
}
function is_runes() {
  return !legacy_mode_flag || component_context !== null && component_context.l === null;
}
let micro_tasks = [];
function run_micro_tasks() {
  var tasks = micro_tasks;
  micro_tasks = [];
  run_all(tasks);
}
function queue_micro_task(fn) {
  if (micro_tasks.length === 0 && !is_flushing_sync) {
    var tasks = micro_tasks;
    queueMicrotask(() => {
      if (tasks === micro_tasks) run_micro_tasks();
    });
  }
  micro_tasks.push(fn);
}
function flush_tasks() {
  while (micro_tasks.length > 0) {
    run_micro_tasks();
  }
}
const STATUS_MASK = -7169;
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function update_derived_status(derived2) {
  if ((derived2.f & CONNECTED) !== 0 || derived2.deps === null) {
    set_signal_status(derived2, CLEAN);
  } else {
    set_signal_status(derived2, MAYBE_DIRTY);
  }
}
function defer_effect(effect2, dirty_reactions) {
  if ((effect2.f & DIRTY) !== 0) {
    dirty_reactions.set(effect2, DIRTY);
  } else if ((effect2.f & MAYBE_DIRTY) !== 0 && dirty_reactions.get(effect2) !== DIRTY) {
    dirty_reactions.set(effect2, MAYBE_DIRTY);
  }
  set_signal_status(effect2, CLEAN);
}
function without_reactive_context(fn) {
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    return fn();
  } finally {
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
function flatten(blockers, sync, async, fn) {
  const d = is_runes() ? derived : derived_safe_equal;
  var pending = blockers.filter((b) => !b.settled);
  var deriveds = sync.map(d);
  if (async.length === 0 && pending.length === 0) {
    fn(deriveds);
    return;
  }
  var parent = (
    /** @type {Effect} */
    active_effect
  );
  var restore = capture();
  var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
  function finish(async2) {
    if ((parent.f & DESTROYED) !== 0) {
      return;
    }
    restore();
    try {
      fn([...deriveds, ...async2]);
    } catch (error) {
      invoke_error_boundary(error, parent);
    }
    unset_context();
  }
  var decrement_pending = increment_pending();
  if (async.length === 0) {
    blocker_promise.then(() => finish([])).finally(decrement_pending);
    return;
  }
  function run2() {
    Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then(finish).catch((error) => invoke_error_boundary(error, parent)).finally(decrement_pending);
  }
  if (blocker_promise) {
    blocker_promise.then(() => {
      if ((parent.f & DESTROYED) !== 0) {
        decrement_pending();
        return;
      }
      restore();
      run2();
      unset_context();
    });
  } else {
    run2();
  }
}
function capture() {
  var previous_effect = (
    /** @type {Effect} */
    active_effect
  );
  var previous_reaction = active_reaction;
  var previous_component_context = component_context;
  var previous_batch2 = (
    /** @type {Batch} */
    current_batch
  );
  return function restore(activate_batch = true) {
    set_active_effect(previous_effect);
    set_active_reaction(previous_reaction);
    set_component_context(previous_component_context);
    if (activate_batch && (previous_effect.f & DESTROYED) === 0) {
      previous_batch2 == null ? void 0 : previous_batch2.activate();
      previous_batch2 == null ? void 0 : previous_batch2.apply();
    }
  };
}
function unset_context(deactivate_batch = true) {
  set_active_effect(null);
  set_active_reaction(null);
  set_component_context(null);
  if (deactivate_batch) current_batch == null ? void 0 : current_batch.deactivate();
}
function increment_pending() {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  var boundary2 = effect2.b;
  var batch = (
    /** @type {Batch} */
    current_batch
  );
  var blocking = !!(boundary2 == null ? void 0 : boundary2.is_rendered());
  boundary2 == null ? void 0 : boundary2.update_pending_count(1, batch);
  batch.increment(blocking, effect2);
  return () => {
    boundary2 == null ? void 0 : boundary2.update_pending_count(-1, batch);
    batch.decrement(blocking, effect2);
  };
}
// @__NO_SIDE_EFFECTS__
function derived(fn) {
  var flags2 = DERIVED | DIRTY;
  if (active_effect !== null) {
    active_effect.f |= EFFECT_PRESERVED;
  }
  const signal = {
    ctx: component_context,
    deps: null,
    effects: null,
    equals,
    f: flags2,
    fn,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      UNINITIALIZED
    ),
    wv: 0,
    parent: active_effect,
    ac: null
  };
  return signal;
}
const OBSOLETE = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function async_derived(fn, label, location) {
  let parent = (
    /** @type {Effect | null} */
    active_effect
  );
  if (parent === null) {
    async_derived_orphan();
  }
  var promise = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  );
  var signal = source(
    /** @type {V} */
    UNINITIALIZED
  );
  var should_suspend = !active_reaction;
  var deferreds = /* @__PURE__ */ new Set();
  async_effect(() => {
    var _a2, _b2;
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    var d = deferred();
    promise = d.promise;
    try {
      Promise.resolve(fn()).then(d.resolve, (e) => {
        if (e !== STALE_REACTION) d.reject(e);
      }).finally(unset_context);
    } catch (error) {
      d.reject(error);
      unset_context();
    }
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    if (should_suspend) {
      if ((effect2.f & REACTION_RAN) !== 0) {
        var decrement_pending = increment_pending();
      }
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (_a2 = parent.b) == null ? void 0 : _a2.is_rendered()
      ) {
        (_b2 = batch.async_deriveds.get(effect2)) == null ? void 0 : _b2.reject(OBSOLETE);
      } else {
        for (const d2 of deferreds.values()) {
          d2.reject(OBSOLETE);
        }
      }
      deferreds.add(d);
      batch.async_deriveds.set(effect2, d);
    }
    const handler = (value, error = void 0) => {
      decrement_pending == null ? void 0 : decrement_pending();
      deferreds.delete(d);
      if (error === OBSOLETE) return;
      batch.activate();
      if (error) {
        signal.f |= ERROR_VALUE;
        internal_set(signal, error);
      } else {
        if ((signal.f & ERROR_VALUE) !== 0) {
          signal.f ^= ERROR_VALUE;
        }
        internal_set(signal, value);
      }
      batch.deactivate();
    };
    d.promise.then(handler, (e) => handler(null, e || "unknown"));
  });
  teardown(() => {
    for (const d of deferreds) {
      d.reject(OBSOLETE);
    }
  });
  return new Promise((fulfil) => {
    function next(p) {
      function go() {
        if (p === promise) {
          fulfil(signal);
        } else {
          next(promise);
        }
      }
      p.then(go, go);
    }
    next(promise);
  });
}
// @__NO_SIDE_EFFECTS__
function user_derived(fn) {
  const d = /* @__PURE__ */ derived(fn);
  push_reaction_value(d);
  return d;
}
// @__NO_SIDE_EFFECTS__
function derived_safe_equal(fn) {
  const signal = /* @__PURE__ */ derived(fn);
  signal.equals = safe_equals;
  return signal;
}
function destroy_derived_effects(derived2) {
  var effects = derived2.effects;
  if (effects !== null) {
    derived2.effects = null;
    for (var i = 0; i < effects.length; i += 1) {
      destroy_effect(
        /** @type {Effect} */
        effects[i]
      );
    }
  }
}
function execute_derived(derived2) {
  var value;
  var prev_active_effect = active_effect;
  var parent = derived2.parent;
  if (!is_destroying_effect && parent !== null && derived2.v !== UNINITIALIZED && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (parent.f & (DESTROYED | INERT)) !== 0) {
    derived_inert();
    return derived2.v;
  }
  set_active_effect(parent);
  {
    try {
      destroy_derived_effects(derived2);
      value = update_reaction(derived2);
    } finally {
      set_active_effect(prev_active_effect);
    }
  }
  return value;
}
function update_derived(derived2) {
  var value = execute_derived(derived2);
  if (!derived2.equals(value)) {
    derived2.wv = increment_write_version();
    if (!(current_batch == null ? void 0 : current_batch.is_fork) || derived2.deps === null) {
      if (current_batch !== null) {
        current_batch.capture(derived2, value, true);
        previous_batch == null ? void 0 : previous_batch.capture(derived2, value, true);
      } else {
        derived2.v = value;
      }
      if (derived2.deps === null) {
        set_signal_status(derived2, CLEAN);
        return;
      }
    }
  }
  if (is_destroying_effect) {
    return;
  }
  if (batch_values !== null) {
    if (effect_tracking() || (current_batch == null ? void 0 : current_batch.is_fork)) {
      batch_values.set(derived2, value);
    }
  } else {
    update_derived_status(derived2);
  }
}
function freeze_derived_effects(derived2) {
  var _a2;
  if (derived2.effects === null) return;
  for (const e of derived2.effects) {
    if (e.teardown || e.ac) {
      (_a2 = e.teardown) == null ? void 0 : _a2.call(e);
      if (e.ac !== null) {
        without_reactive_context(() => {
          e.ac.abort(STALE_REACTION);
          e.ac = null;
        });
      }
      if (e.fn !== null) e.teardown = noop;
      remove_reactions(e, 0);
      destroy_effect_children(e);
    }
  }
}
function unfreeze_derived_effects(derived2) {
  if (derived2.effects === null) return;
  for (const e of derived2.effects) {
    if (e.teardown && e.fn !== null) {
      update_effect(e);
    }
  }
}
let first_batch = null;
let last_batch = null;
let current_batch = null;
let previous_batch = null;
let batch_values = null;
let last_scheduled_effect = null;
let is_flushing_sync = false;
let is_processing = false;
let collected_effects = null;
let legacy_updates = null;
var flush_count = 0;
let uid = 1;
const _Batch = class _Batch {
  constructor() {
    __privateAdd(this, _Batch_instances);
    __publicField(this, "id", uid++);
    /** True as soon as `#process` was called */
    __publicField(this, "started", false);
    __publicField(this, "linked", true);
    /** @type {Batch | null} */
    __publicField(this, "prev", null);
    /** @type {Batch | null} */
    __publicField(this, "next", null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    __publicField(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * The keys of this map are identical to `this.previous`
     * @type {Map<Value, [any, boolean]>}
     */
    __publicField(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * The keys of this map are identical to `this.current`
     * @type {Map<Value, any>}
     */
    __publicField(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    __privateAdd(this, _commit_callbacks, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    __privateAdd(this, _discard_callbacks, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    __privateAdd(this, _pending, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    __privateAdd(this, _blocking_pending, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    __privateAdd(this, _deferred, null);
    /**
     * Effects that were scheduled in this batch but not yet 'resolved' into the
     * root effects that need to be flushed. Resolving — the upwards traversal that
     * marks the path to each effect on the shared effect tree (see #resolve) — is
     * deferred until the batch is processed, so that the markers are created and
     * consumed within a single traversal. Scheduling into other batches (which can
     * happen concurrently, e.g. while a batch is committed) can therefore never
     * observe (and be confused by) this batch's markers.
     * May contain duplicates — deduplication happens during resolving
     * @type {Effect[]}
     */
    __privateAdd(this, _scheduled, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    __privateAdd(this, _new_effects, []);
    /**
     * Deferred effects (which run after async work has completed) and their status (DIRTY or MAYBE_DIRTY)
     * @type {Map<Effect, number>}
     */
    __privateAdd(this, _dirty_reactions, /* @__PURE__ */ new Map());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    __privateAdd(this, _skipped_branches, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    __privateAdd(this, _unskipped_branches, /* @__PURE__ */ new Set());
    __publicField(this, "is_fork", false);
    __privateAdd(this, _decrement_queued, false);
    if (last_batch === null) {
      first_batch = last_batch = this;
    } else {
      last_batch.next = this;
      this.prev = last_batch;
    }
    last_batch = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(effect2) {
    if (!__privateGet(this, _skipped_branches).has(effect2)) {
      __privateGet(this, _skipped_branches).set(effect2, { d: [], m: [] });
    }
    __privateGet(this, _unskipped_branches).delete(effect2);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(effect2, callback = (e) => this.schedule(e)) {
    var tracked = __privateGet(this, _skipped_branches).get(effect2);
    if (tracked) {
      __privateGet(this, _skipped_branches).delete(effect2);
      for (var e of tracked.d) {
        set_signal_status(e, DIRTY);
        callback(e);
      }
      for (e of tracked.m) {
        set_signal_status(e, MAYBE_DIRTY);
        callback(e);
      }
    }
    __privateGet(this, _unskipped_branches).add(effect2);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(source2, value, is_derived = false) {
    if (source2.v !== UNINITIALIZED && !this.previous.has(source2)) {
      this.previous.set(source2, source2.v);
    }
    if ((source2.f & ERROR_VALUE) === 0) {
      this.current.set(source2, [value, is_derived]);
      batch_values == null ? void 0 : batch_values.set(source2, value);
    }
    if (!this.is_fork) {
      source2.v = value;
    }
  }
  activate() {
    current_batch = this;
  }
  deactivate() {
    current_batch = null;
    batch_values = null;
  }
  flush() {
    try {
      is_processing = true;
      current_batch = this;
      __privateMethod(this, _Batch_instances, process_fn).call(this);
    } finally {
      flush_count = 0;
      last_scheduled_effect = null;
      collected_effects = null;
      legacy_updates = null;
      is_processing = false;
      current_batch = null;
      batch_values = null;
      old_values.clear();
    }
  }
  discard() {
    var _a2;
    for (const fn of __privateGet(this, _discard_callbacks)) fn(this);
    __privateGet(this, _discard_callbacks).clear();
    for (const deferred2 of this.async_deriveds.values()) {
      deferred2.reject(OBSOLETE);
    }
    __privateMethod(this, _Batch_instances, unlink_fn).call(this);
    (_a2 = __privateGet(this, _deferred)) == null ? void 0 : _a2.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(effect2) {
    __privateGet(this, _new_effects).push(effect2);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(blocking, effect2) {
    __privateSet(this, _pending, __privateGet(this, _pending) + 1);
    if (blocking) {
      let blocking_pending_count = __privateGet(this, _blocking_pending).get(effect2) ?? 0;
      __privateGet(this, _blocking_pending).set(effect2, blocking_pending_count + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(blocking, effect2) {
    __privateSet(this, _pending, __privateGet(this, _pending) - 1);
    if (blocking) {
      let blocking_pending_count = __privateGet(this, _blocking_pending).get(effect2) ?? 0;
      if (blocking_pending_count === 1) {
        __privateGet(this, _blocking_pending).delete(effect2);
      } else {
        __privateGet(this, _blocking_pending).set(effect2, blocking_pending_count - 1);
      }
    }
    if (__privateGet(this, _decrement_queued)) return;
    __privateSet(this, _decrement_queued, true);
    queue_micro_task(() => {
      __privateSet(this, _decrement_queued, false);
      if (this.linked) {
        this.flush();
      }
    });
  }
  /**
   * @param {Map<Effect, number>} dirty_reactions
   */
  transfer_reactions(dirty_reactions) {
    for (const [effect2, status] of dirty_reactions) {
      this.add_dirty_reaction(effect2, status);
    }
    dirty_reactions.clear();
  }
  /**
   * @param {Effect} effect
   * @param {number} status
   */
  add_dirty_reaction(effect2, status) {
    if (status === DIRTY || __privateGet(this, _dirty_reactions).get(effect2) !== DIRTY) {
      __privateGet(this, _dirty_reactions).set(effect2, status);
    }
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(fn) {
    __privateGet(this, _commit_callbacks).add(fn);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(fn) {
    __privateGet(this, _discard_callbacks).add(fn);
  }
  settled() {
    return (__privateGet(this, _deferred) ?? __privateSet(this, _deferred, deferred())).promise;
  }
  static ensure() {
    if (current_batch === null) {
      const batch = current_batch = new _Batch();
      if (!is_processing && !is_flushing_sync) {
        queue_micro_task(() => {
          if (!batch.started) {
            batch.flush();
          }
        });
      }
    }
    return current_batch;
  }
  apply() {
    {
      batch_values = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(effect2) {
    var _a2;
    last_scheduled_effect = effect2;
    if (((_a2 = effect2.b) == null ? void 0 : _a2.is_pending) && (effect2.f & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0 && (effect2.f & REACTION_RAN) === 0) {
      effect2.b.defer_effect(effect2);
      return;
    }
    __privateGet(this, _scheduled).push(effect2);
  }
};
_commit_callbacks = new WeakMap();
_discard_callbacks = new WeakMap();
_pending = new WeakMap();
_blocking_pending = new WeakMap();
_deferred = new WeakMap();
_scheduled = new WeakMap();
_new_effects = new WeakMap();
_dirty_reactions = new WeakMap();
_skipped_branches = new WeakMap();
_unskipped_branches = new WeakMap();
_decrement_queued = new WeakMap();
_Batch_instances = new WeakSet();
is_deferred_fn = function() {
  if (this.is_fork) return true;
  for (const effect2 of __privateGet(this, _blocking_pending).keys()) {
    if (!__privateMethod(this, _Batch_instances, is_skipped_fn).call(this, effect2)) {
      return true;
    }
  }
  return false;
};
/**
 * Whether `effect` is inside a branch that this batch skips
 * @param {Effect} effect
 */
is_skipped_fn = function(effect2) {
  for (var e = (
    /** @type {Effect | null} */
    effect2
  ); e !== null; e = e.parent) {
    if (__privateGet(this, _skipped_branches).has(e)) return true;
  }
  return false;
};
/**
 * Convert the effects that were scheduled in this batch into the root effects
 * that need to be traversed, marking the path to each effect (by clearing the
 * `CLEAN` flag on ancestor branches) so that the traversal can find them.
 * This happens right before traversal rather than at scheduling time, so that
 * the markers left on the (shared) effect tree are created and consumed within
 * a single traversal — scheduling into other batches can never observe them
 * @returns {Effect[]}
 */
resolve_fn = function() {
  var roots = [];
  for (const effect2 of __privateGet(this, _scheduled)) {
    if ((effect2.f & DESTROYED) !== 0 || (effect2.f & (DIRTY | MAYBE_DIRTY)) === 0) continue;
    var e = effect2;
    var covered = false;
    while (e.parent !== null) {
      e = e.parent;
      var flags2 = e.f;
      if ((flags2 & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags2 & CLEAN) === 0) {
          covered = true;
          break;
        }
        e.f ^= CLEAN;
      }
    }
    if (!covered) {
      roots.push(e);
    }
  }
  __privateSet(this, _scheduled, []);
  return roots;
};
process_fn = function() {
  var _a2, _b2, _c, _d;
  this.started = true;
  for (const [e, status] of __privateGet(this, _dirty_reactions)) {
    set_signal_status(e, status);
    this.schedule(e);
  }
  this.apply();
  var effects = collected_effects = [];
  var render_effects = [];
  var updates = legacy_updates = [];
  while (__privateGet(this, _scheduled).length > 0) {
    if (flush_count++ > 1e3) {
      __privateMethod(this, _Batch_instances, unlink_fn).call(this);
      infinite_loop_guard();
    }
    for (const root2 of __privateMethod(this, _Batch_instances, resolve_fn).call(this)) {
      try {
        __privateMethod(this, _Batch_instances, traverse_fn).call(this, root2, effects, render_effects);
      } catch (e) {
        reset_all(root2);
        if (!__privateMethod(this, _Batch_instances, is_deferred_fn).call(this)) this.discard();
        throw e;
      }
    }
    if (__privateGet(this, _scheduled).length > 0) {
      for (const effect2 of render_effects) __privateGet(this, _scheduled).push(effect2);
      for (const effect2 of effects) __privateGet(this, _scheduled).push(effect2);
      render_effects.length = 0;
      effects.length = 0;
    }
  }
  current_batch = null;
  if (updates.length > 0) {
    var batch = _Batch.ensure();
    for (const e of updates) {
      batch.schedule(e);
    }
  }
  collected_effects = null;
  legacy_updates = null;
  if (__privateMethod(this, _Batch_instances, is_deferred_fn).call(this)) {
    __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, render_effects);
    __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, effects);
    for (const [e, t] of __privateGet(this, _skipped_branches)) {
      reset_branch(e, t);
    }
    if (updates.length > 0) {
      /** @type {unknown} */
      __privateMethod(_a2 = current_batch, _Batch_instances, process_fn).call(_a2);
    }
    return;
  }
  const earlier_batch = __privateMethod(this, _Batch_instances, find_earlier_batch_fn).call(this);
  if (earlier_batch) {
    __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, render_effects);
    __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, effects);
    __privateMethod(_b2 = earlier_batch, _Batch_instances, merge_fn).call(_b2, this);
    return;
  }
  __privateGet(this, _dirty_reactions).clear();
  for (const fn of __privateGet(this, _commit_callbacks)) fn(this);
  __privateGet(this, _commit_callbacks).clear();
  previous_batch = this;
  flush_queued_effects(render_effects);
  flush_queued_effects(effects);
  previous_batch = null;
  (_c = __privateGet(this, _deferred)) == null ? void 0 : _c.resolve();
  var next_batch = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    current_batch
  );
  if (__privateGet(this, _pending) === 0 && (__privateGet(this, _scheduled).length === 0 || next_batch !== null)) {
    __privateMethod(this, _Batch_instances, unlink_fn).call(this);
  }
  if (next_batch !== null) {
    old_values.clear();
    __privateMethod(_d = next_batch, _Batch_instances, process_fn).call(_d);
  }
};
/**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
traverse_fn = function(root2, effects, render_effects) {
  root2.f ^= CLEAN;
  var effect2 = root2.first;
  while (effect2 !== null) {
    var flags2 = effect2.f;
    var is_branch = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
    var is_skippable_branch = is_branch && (flags2 & CLEAN) !== 0;
    var skip = is_skippable_branch || (flags2 & INERT) !== 0 || __privateGet(this, _skipped_branches).has(effect2);
    if (!skip && effect2.fn !== null) {
      if (is_branch) {
        effect2.f ^= CLEAN;
      } else if ((flags2 & EFFECT) !== 0) {
        effects.push(effect2);
      } else if (is_dirty(effect2)) {
        if ((flags2 & BLOCK_EFFECT) !== 0) this.add_dirty_reaction(effect2, MAYBE_DIRTY);
        update_effect(effect2);
      }
      var child2 = effect2.first;
      if (child2 !== null) {
        effect2 = child2;
        continue;
      }
    }
    while (effect2 !== null) {
      var next = effect2.next;
      if (next !== null) {
        effect2 = next;
        break;
      }
      effect2 = effect2.parent;
    }
  }
};
find_earlier_batch_fn = function() {
  for (var batch = this.prev; batch !== null; batch = batch.prev) {
    if (!batch.is_fork && __privateMethod(this, _Batch_instances, intersects_fn).call(this, batch)) return batch;
  }
  return null;
};
/** @param {Batch} batch */
intersects_fn = function(batch) {
  for (const [source2, [, is_derived]] of this.current) {
    if (is_derived) continue;
    if (batch.current.has(source2)) return true;
  }
  return false;
};
/**
 * @param {Batch} batch
 */
merge_fn = function(batch) {
  var _a2;
  for (const [source2, value] of batch.current) {
    if (!this.previous.has(source2) && batch.previous.has(source2)) {
      this.previous.set(source2, batch.previous.get(source2));
    }
    this.current.set(source2, value);
  }
  for (const [effect2, deferred2] of batch.async_deriveds) {
    const d = this.async_deriveds.get(effect2);
    if (d) deferred2.promise.then(d.resolve).catch(d.reject);
  }
  batch.async_deriveds.clear();
  this.transfer_reactions(__privateGet(batch, _dirty_reactions));
  const mark = (value) => {
    var reactions = value.reactions;
    if (reactions === null) return;
    if ((value.f & DERIVED) !== 0 && (value.f & (DIRTY | MAYBE_DIRTY)) === 0) {
      return;
    }
    for (const reaction of reactions) {
      var flags2 = reaction.f;
      if ((flags2 & DERIVED) !== 0) {
        mark(
          /** @type {Derived} */
          reaction
        );
      } else {
        var effect2 = (
          /** @type {Effect} */
          reaction
        );
        if (flags2 & (ASYNC | BLOCK_EFFECT) && !this.async_deriveds.has(effect2)) {
          __privateGet(this, _dirty_reactions).delete(effect2);
          set_signal_status(effect2, DIRTY);
          this.schedule(effect2);
        }
      }
    }
  };
  for (const source2 of this.current.keys()) {
    mark(source2);
  }
  this.oncommit(() => batch.discard());
  __privateMethod(_a2 = batch, _Batch_instances, unlink_fn).call(_a2);
  current_batch = this;
  __privateMethod(this, _Batch_instances, process_fn).call(this);
};
/**
 * @param {Effect[]} effects
 */
defer_effects_fn = function(effects) {
  for (var i = 0; i < effects.length; i += 1) {
    defer_effect(effects[i], __privateGet(this, _dirty_reactions));
  }
};
commit_fn = function() {
  var _a2, _b2;
  for (let batch = first_batch; batch !== null; batch = batch.next) {
    var is_earlier = batch.id < this.id;
    var sources = [];
    for (const [source3, [value, is_derived]] of this.current) {
      if (batch.current.has(source3)) {
        var batch_value = (
          /** @type {[any, boolean]} */
          batch.current.get(source3)[0]
        );
        if (is_earlier && value !== batch_value) {
          batch.current.set(source3, [value, is_derived]);
        } else {
          continue;
        }
      }
      sources.push(source3);
    }
    if (is_earlier) {
      for (const [effect2, deferred2] of this.async_deriveds) {
        const d = batch.async_deriveds.get(effect2);
        if (d) deferred2.promise.then(d.resolve).catch(d.reject);
      }
    }
    var current = [...batch.current.keys()].filter(
      (source3) => !/** @type {[any, boolean]} */
      batch.current.get(source3)[1]
    );
    if (!batch.started || current.length === 0) continue;
    var others = current.filter((source3) => !this.current.has(source3));
    if (others.length === 0) {
      if (is_earlier) {
        batch.discard();
      }
    } else if (sources.length > 0) {
      if (is_earlier) {
        for (const unskipped of __privateGet(this, _unskipped_branches)) {
          batch.unskip_effect(unskipped, (e) => {
            var _a3;
            if ((e.f & (BLOCK_EFFECT | ASYNC)) !== 0) {
              batch.schedule(e);
            } else {
              __privateMethod(_a3 = batch, _Batch_instances, defer_effects_fn).call(_a3, [e]);
            }
          });
        }
      }
      batch.activate();
      var marked = /* @__PURE__ */ new Set();
      var checked = /* @__PURE__ */ new Map();
      for (var source2 of sources) {
        mark_effects(source2, others, marked, checked);
      }
      checked = /* @__PURE__ */ new Map();
      var current_unequal = [...batch.current].filter(([c, v1]) => {
        const v2 = this.current.get(c);
        if (!v2) return true;
        return v2[0] !== v1[0] || v2[1] !== v1[1];
      }).map(([c]) => c);
      if (current_unequal.length > 0) {
        for (const effect2 of __privateGet(this, _new_effects)) {
          if ((effect2.f & (DESTROYED | INERT | EAGER_EFFECT)) === 0 && depends_on(effect2, current_unequal, checked)) {
            if ((effect2.f & (ASYNC | BLOCK_EFFECT)) !== 0) {
              set_signal_status(effect2, DIRTY);
              batch.schedule(effect2);
            } else {
              batch.add_dirty_reaction(effect2, DIRTY);
            }
          }
        }
      }
      if (__privateGet(batch, _scheduled).length > 0 && !__privateGet(batch, _decrement_queued)) {
        batch.apply();
        for (var root2 of __privateMethod(_a2 = batch, _Batch_instances, resolve_fn).call(_a2)) {
          __privateMethod(_b2 = batch, _Batch_instances, traverse_fn).call(_b2, root2, [], []);
        }
      }
      batch.deactivate();
    }
  }
};
unlink_fn = function() {
  if (!this.linked) return;
  var prev = this.prev;
  var next = this.next;
  if (prev === null) {
    first_batch = next;
  } else {
    prev.next = next;
  }
  if (next === null) {
    last_batch = prev;
  } else {
    next.prev = prev;
  }
  this.linked = false;
};
let Batch = _Batch;
function flushSync(fn) {
  var was_flushing_sync = is_flushing_sync;
  var prev_previous_batch = previous_batch;
  previous_batch = null;
  is_flushing_sync = true;
  try {
    var result;
    if (fn) ;
    while (true) {
      flush_tasks();
      if (current_batch === null) {
        return (
          /** @type {T} */
          result
        );
      }
      current_batch.flush();
    }
  } finally {
    is_flushing_sync = was_flushing_sync;
    previous_batch = prev_previous_batch;
  }
}
function infinite_loop_guard() {
  try {
    effect_update_depth_exceeded();
  } catch (error) {
    invoke_error_boundary(error, last_scheduled_effect);
  }
}
let eager_block_effects = null;
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0) return;
  var i = 0;
  while (i < length) {
    var effect2 = effects[i++];
    if ((effect2.f & (DESTROYED | INERT)) === 0 && is_dirty(effect2)) {
      eager_block_effects = /* @__PURE__ */ new Set();
      update_effect(effect2);
      if (effect2.deps === null && effect2.first === null && effect2.nodes === null && effect2.teardown === null && effect2.ac === null) {
        unlink_effect(effect2);
      }
      if ((eager_block_effects == null ? void 0 : eager_block_effects.size) > 0) {
        old_values.clear();
        for (const e of eager_block_effects) {
          if ((e.f & (DESTROYED | INERT)) !== 0) continue;
          const ordered_effects = [e];
          let ancestor = e.parent;
          while (ancestor !== null) {
            if (eager_block_effects.has(ancestor)) {
              eager_block_effects.delete(ancestor);
              ordered_effects.push(ancestor);
            }
            ancestor = ancestor.parent;
          }
          for (let j = ordered_effects.length - 1; j >= 0; j--) {
            const e2 = ordered_effects[j];
            if ((e2.f & (DESTROYED | INERT)) !== 0) continue;
            update_effect(e2);
          }
        }
        eager_block_effects.clear();
      }
    }
  }
  eager_block_effects = null;
}
function mark_effects(value, sources, marked, checked) {
  if (marked.has(value)) return;
  marked.add(value);
  if (value.reactions !== null) {
    for (const reaction of value.reactions) {
      const flags2 = reaction.f;
      if ((flags2 & DERIVED) !== 0) {
        mark_effects(
          /** @type {Derived} */
          reaction,
          sources,
          marked,
          checked
        );
      } else if ((flags2 & (ASYNC | BLOCK_EFFECT)) !== 0 && (flags2 & DIRTY) === 0 && depends_on(reaction, sources, checked)) {
        set_signal_status(reaction, DIRTY);
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
}
function depends_on(reaction, sources, checked) {
  const depends = checked.get(reaction);
  if (depends !== void 0) return depends;
  if (reaction.deps !== null) {
    for (const dep of reaction.deps) {
      if (includes.call(sources, dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on(
        /** @type {Derived} */
        dep,
        sources,
        checked
      )) {
        checked.set(
          /** @type {Derived} */
          dep,
          true
        );
        return true;
      }
    }
  }
  checked.set(reaction, false);
  return false;
}
function schedule_effect(effect2) {
  current_batch.schedule(effect2);
}
function reset_branch(effect2, tracked) {
  if ((effect2.f & BRANCH_EFFECT) !== 0 && (effect2.f & CLEAN) !== 0) {
    return;
  }
  if ((effect2.f & DIRTY) !== 0) {
    tracked.d.push(effect2);
  } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
    tracked.m.push(effect2);
  }
  set_signal_status(effect2, CLEAN);
  var e = effect2.first;
  while (e !== null) {
    reset_branch(e, tracked);
    e = e.next;
  }
}
function reset_all(effect2) {
  set_signal_status(effect2, CLEAN);
  var e = effect2.first;
  while (e !== null) {
    reset_all(e);
    e = e.next;
  }
}
let eager_effects = /* @__PURE__ */ new Set();
const old_values = /* @__PURE__ */ new Map();
let eager_effects_deferred = false;
function source(v, stack) {
  var signal = {
    f: 0,
    v,
    reactions: null,
    equals,
    rv: 0,
    wv: 0
  };
  return signal;
}
// @__NO_SIDE_EFFECTS__
function state(v, stack) {
  const s = source(v);
  push_reaction_value(s);
  return s;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value, immutable = false, trackable = true) {
  var _a2;
  const s = source(initial_value);
  if (!immutable) {
    s.equals = safe_equals;
  }
  if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
    ((_a2 = component_context.l).s ?? (_a2.s = [])).push(s);
  }
  return s;
}
function set(source2, value, should_proxy = false) {
  if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 && (current_sources === null || !current_sources.has(source2))) {
    state_unsafe_mutation();
  }
  let new_value = should_proxy ? proxy(value) : value;
  return internal_set(source2, new_value, legacy_updates);
}
var seen = null;
var count_deps = 0;
function internal_set(source2, value, updated_during_traversal = null) {
  if (!source2.equals(value)) {
    if (is_destroying_effect) {
      old_values.set(source2, value);
    } else if (!old_values.has(source2)) {
      old_values.set(source2, source2.v);
    }
    var batch = Batch.ensure();
    batch.capture(source2, value);
    if ((source2.f & DERIVED) !== 0) {
      const derived2 = (
        /** @type {Derived} */
        source2
      );
      if ((source2.f & DIRTY) !== 0) {
        execute_derived(derived2);
      }
      if (batch_values === null) {
        update_derived_status(derived2);
      }
    }
    source2.wv = increment_write_version();
    seen = null;
    count_deps = 0;
    mark_reactions(source2, DIRTY, updated_during_traversal);
    seen = null;
    if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
      if (untracked_writes === null) {
        set_untracked_writes([source2]);
      } else {
        untracked_writes.push(source2);
      }
    }
    if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
      flush_eager_effects();
    }
  }
  return value;
}
function flush_eager_effects() {
  eager_effects_deferred = false;
  for (const effect2 of eager_effects) {
    if ((effect2.f & CLEAN) !== 0) {
      set_signal_status(effect2, MAYBE_DIRTY);
    }
    let dirty;
    try {
      dirty = is_dirty(effect2);
    } catch {
      dirty = true;
    }
    if (dirty) {
      update_effect(effect2);
    }
  }
  eager_effects.clear();
}
function increment(source2) {
  set(source2, source2.v + 1);
}
function mark_reactions(signal, status, updated_during_traversal) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  var runes = is_runes();
  var length = reactions.length;
  count_deps += length;
  if (count_deps > 1e5 && seen === null) seen = /* @__PURE__ */ new Set();
  if (seen !== null) {
    if (seen.has(signal)) return;
    seen.add(signal);
  }
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    var flags2 = reaction.f;
    if (!runes && reaction === active_effect) continue;
    var not_dirty = (flags2 & DIRTY) === 0;
    if (not_dirty) {
      set_signal_status(reaction, status);
    }
    if ((flags2 & EAGER_EFFECT) !== 0) {
      eager_effects.add(
        /** @type {Effect} */
        reaction
      );
    } else if ((flags2 & DERIVED) !== 0) {
      var derived2 = (
        /** @type {Derived} */
        reaction
      );
      batch_values == null ? void 0 : batch_values.delete(derived2);
      mark_reactions(derived2, MAYBE_DIRTY, updated_during_traversal);
    } else if (not_dirty) {
      var effect2 = (
        /** @type {Effect} */
        reaction
      );
      if ((flags2 & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
        eager_block_effects.add(effect2);
      }
      if (updated_during_traversal !== null) {
        updated_during_traversal.push(effect2);
      } else {
        schedule_effect(effect2);
      }
    }
  }
}
function proxy(value) {
  if (typeof value !== "object" || value === null || STATE_SYMBOL in value || COMPONENT_SYMBOL in value) {
    return value;
  }
  const prototype = get_prototype_of(value);
  if (prototype !== object_prototype && prototype !== array_prototype) {
    return value;
  }
  var sources = /* @__PURE__ */ new Map();
  var is_proxied_array = is_array(value);
  var version = /* @__PURE__ */ state(0);
  var parent_version = update_version;
  var with_parent = (fn) => {
    if (update_version === parent_version) {
      return fn();
    }
    var reaction = active_reaction;
    var version2 = update_version;
    set_active_reaction(null);
    set_update_version(parent_version);
    var result = fn();
    set_active_reaction(reaction);
    set_update_version(version2);
    return result;
  };
  if (is_proxied_array) {
    sources.set("length", /* @__PURE__ */ state(
      /** @type {any[]} */
      value.length
    ));
  }
  return new Proxy(
    /** @type {any} */
    value,
    {
      defineProperty(_, prop2, descriptor) {
        if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
          state_descriptors_fixed();
        }
        var s = sources.get(prop2);
        if (s === void 0) {
          with_parent(() => {
            var s2 = /* @__PURE__ */ state(descriptor.value);
            sources.set(prop2, s2);
            return s2;
          });
        } else {
          set(s, descriptor.value, true);
        }
        return true;
      },
      deleteProperty(target, prop2) {
        var s = sources.get(prop2);
        if (s === void 0) {
          if (prop2 in target) {
            const s2 = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
            sources.set(prop2, s2);
            increment(version);
          }
        } else {
          set(s, UNINITIALIZED);
          increment(version);
        }
        return true;
      },
      get(target, prop2, receiver) {
        var _a2;
        if (prop2 === STATE_SYMBOL) {
          return value;
        }
        var s = sources.get(prop2);
        var exists = prop2 in target;
        if (s === void 0 && (!exists || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable))) {
          s = with_parent(() => {
            var p = proxy(exists ? target[prop2] : UNINITIALIZED);
            var s2 = /* @__PURE__ */ state(p);
            return s2;
          });
          sources.set(prop2, s);
        }
        if (s !== void 0) {
          var v = get(s);
          return v === UNINITIALIZED ? void 0 : v;
        }
        return Reflect.get(target, prop2, receiver);
      },
      getOwnPropertyDescriptor(target, prop2) {
        var _a2;
        (_a2 = this.has) == null ? void 0 : _a2.call(this, target, prop2);
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
        var s = sources.get(prop2);
        if (s !== void 0) {
          var value2 = get(s);
          if (value2 === UNINITIALIZED) {
            return void 0;
          }
          if (descriptor && "value" in descriptor) {
            descriptor.value = value2;
          } else {
            return {
              enumerable: true,
              configurable: true,
              value: value2,
              writable: true
            };
          }
        }
        return descriptor;
      },
      has(target, prop2) {
        var _a2;
        if (prop2 === STATE_SYMBOL) {
          return true;
        }
        var s = sources.get(prop2);
        var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
        if (s !== void 0 || (active_effect !== null || active_reaction !== null) && (!has || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable))) {
          if (s === void 0) {
            s = with_parent(() => {
              var p = has ? proxy(target[prop2]) : UNINITIALIZED;
              var s2 = /* @__PURE__ */ state(p);
              return s2;
            });
            sources.set(prop2, s);
          }
          var value2 = get(s);
          if (value2 === UNINITIALIZED) {
            return false;
          }
        }
        return has;
      },
      set(target, prop2, value2, receiver) {
        var _a2;
        var s = sources.get(prop2);
        var has = prop2 in target;
        if (is_proxied_array && prop2 === "length") {
          for (var i = value2; i < /** @type {Source<number>} */
          s.v; i += 1) {
            var other_s = sources.get(i + "");
            if (other_s !== void 0) {
              set(other_s, UNINITIALIZED);
            } else if (i in target) {
              other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
              sources.set(i + "", other_s);
            }
          }
        }
        if (s === void 0) {
          if (!has || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable)) {
            s = with_parent(() => /* @__PURE__ */ state(void 0));
            set(s, proxy(value2));
            sources.set(prop2, s);
          }
        } else {
          has = s.v !== UNINITIALIZED;
          var p = with_parent(() => proxy(value2));
          set(s, p);
        }
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
        if (descriptor == null ? void 0 : descriptor.set) {
          descriptor.set.call(receiver, value2);
        }
        if (!has) {
          if (is_proxied_array && typeof prop2 === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop2);
            if (Number.isInteger(n) && n >= ls.v) {
              set(ls, n + 1);
            }
          }
          increment(version);
        }
        return true;
      },
      ownKeys(target) {
        get(version);
        var own_keys = Reflect.ownKeys(target).filter((key3) => {
          var source3 = sources.get(key3);
          return source3 === void 0 || source3.v !== UNINITIALIZED;
        });
        for (var [key2, source2] of sources) {
          if (source2.v !== UNINITIALIZED && !(key2 in target)) {
            own_keys.push(key2);
          }
        }
        return own_keys;
      },
      setPrototypeOf() {
        state_prototype_fixed();
      }
    }
  );
}
var $window;
var is_firefox;
var first_child_getter;
var next_sibling_getter;
function init_operations() {
  if ($window !== void 0) {
    return;
  }
  $window = window;
  is_firefox = /Firefox/.test(navigator.userAgent);
  var element_prototype = Element.prototype;
  var node_prototype = Node.prototype;
  var text_prototype = Text.prototype;
  first_child_getter = get_descriptor(node_prototype, "firstChild").get;
  next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
  if (is_extensible(element_prototype)) {
    element_prototype[CLASS_CACHE] = void 0;
    element_prototype[ATTRIBUTES_CACHE] = null;
    element_prototype[STYLE_CACHE] = void 0;
    element_prototype.__e = void 0;
  }
  if (is_extensible(text_prototype)) {
    text_prototype[TEXT_CACHE] = void 0;
  }
}
function create_text(value = "") {
  return document.createTextNode(value);
}
// @__NO_SIDE_EFFECTS__
function get_first_child(node) {
  return (
    /** @type {TemplateNode | null} */
    first_child_getter.call(node)
  );
}
// @__NO_SIDE_EFFECTS__
function get_next_sibling(node) {
  return (
    /** @type {TemplateNode | null} */
    next_sibling_getter.call(node)
  );
}
function child(node, is_text) {
  {
    return /* @__PURE__ */ get_first_child(node);
  }
}
function first_child(node, is_text = false) {
  {
    var first = /* @__PURE__ */ get_first_child(node);
    if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
    return first;
  }
}
function only_child(node, is_text = false) {
  {
    return /* @__PURE__ */ get_first_child(node);
  }
}
function sibling(node, count = 1, is_text = false) {
  let next_sibling = node;
  while (count--) {
    next_sibling = /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(next_sibling);
  }
  {
    return next_sibling;
  }
}
function clear_text_content(node) {
  node.textContent = "";
}
function should_defer_append() {
  return false;
}
function create_element(tag, namespace, is) {
  {
    return (
      /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
      is ? document.createElement(tag, { is }) : document.createElement(tag)
    );
  }
}
function handle_error(error) {
  var effect2 = active_effect;
  if (effect2 === null) {
    active_reaction.f |= ERROR_VALUE;
    return error;
  }
  if ((effect2.f & REACTION_RAN) === 0 && (effect2.f & EFFECT) === 0) {
    throw error;
  }
  invoke_error_boundary(error, effect2);
}
function invoke_error_boundary(error, effect2) {
  if (error === HYDRATION_ERROR) {
    throw error;
  }
  if (effect2 !== null && (effect2.f & DESTROYED) !== 0) {
    return;
  }
  while (effect2 !== null) {
    if ((effect2.f & BOUNDARY_EFFECT) !== 0 && (effect2.f & (DESTROYED | DESTROYING)) === 0) {
      if ((effect2.f & REACTION_RAN) === 0) {
        throw error;
      }
      try {
        effect2.b.error(error);
        return;
      } catch (e) {
        error = e;
      }
    }
    effect2 = effect2.parent;
  }
  throw error;
}
function validate_effect(rune) {
  if (active_effect === null) {
    if (active_reaction === null) {
      effect_orphan();
    }
    effect_in_unowned_derived();
  }
  if (is_destroying_effect) {
    effect_in_teardown();
  }
}
function push_effect(effect2, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect2;
  } else {
    parent_last.next = effect2;
    effect2.prev = parent_last;
    parent_effect.last = effect2;
  }
}
function create_effect(type, fn) {
  var parent = active_effect;
  if (parent !== null && (parent.f & INERT) !== 0) {
    type |= INERT;
  }
  var effect2 = {
    ctx: component_context,
    deps: null,
    nodes: null,
    f: type | DIRTY | CONNECTED,
    first: null,
    fn,
    last: null,
    next: null,
    parent,
    b: parent && parent.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  current_batch == null ? void 0 : current_batch.register_created_effect(effect2);
  var e = effect2;
  if ((type & EFFECT) !== 0) {
    if (collected_effects !== null) {
      collected_effects.push(effect2);
    } else {
      Batch.ensure().schedule(effect2);
    }
  } else if (fn !== null) {
    try {
      update_effect(effect2);
    } catch (e2) {
      destroy_effect(effect2);
      throw e2;
    }
    if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && // either `null`, or a singular child
    (e.f & EFFECT_PRESERVED) === 0) {
      e = e.first;
      if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e !== null) {
        e.f |= EFFECT_TRANSPARENT;
      }
    }
  }
  if (e !== null) {
    e.parent = parent;
    if (parent !== null) {
      push_effect(e, parent);
    }
    if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (type & ROOT_EFFECT) === 0) {
      var derived2 = (
        /** @type {Derived} */
        active_reaction
      );
      (derived2.effects ?? (derived2.effects = [])).push(e);
    }
  }
  return effect2;
}
function effect_tracking() {
  return active_reaction !== null && !untracking;
}
function teardown(fn) {
  const effect2 = create_effect(RENDER_EFFECT, null);
  set_signal_status(effect2, CLEAN);
  effect2.teardown = fn;
  return effect2;
}
function user_effect(fn) {
  validate_effect();
  var flags2 = (
    /** @type {Effect} */
    active_effect.f
  );
  var defer = !active_reaction && (flags2 & BRANCH_EFFECT) !== 0 && component_context !== null && !component_context.i;
  if (defer) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    (context.e ?? (context.e = [])).push(fn);
  } else {
    return create_user_effect(fn);
  }
}
function create_user_effect(fn) {
  return create_effect(EFFECT | USER_EFFECT, fn);
}
function user_pre_effect(fn) {
  validate_effect();
  return create_effect(RENDER_EFFECT | USER_EFFECT, fn);
}
function component_root(fn) {
  Batch.ensure();
  const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn);
  return (options = {}) => {
    return new Promise((fulfil) => {
      if (options.outro) {
        pause_effect(effect2, () => {
          destroy_effect(effect2);
          fulfil(void 0);
        });
      } else {
        destroy_effect(effect2);
        fulfil(void 0);
      }
    });
  };
}
function effect(fn) {
  return create_effect(EFFECT, fn);
}
function async_effect(fn) {
  return create_effect(ASYNC | EFFECT_PRESERVED, fn);
}
function render_effect(fn, flags2 = 0) {
  return create_effect(RENDER_EFFECT | flags2, fn);
}
function template_effect(fn, sync = [], async = [], blockers = []) {
  flatten(blockers, sync, async, (values) => {
    create_effect(RENDER_EFFECT, () => {
      fn(...values.map(get));
    });
  });
}
function block(fn, flags2 = 0) {
  var effect2 = create_effect(BLOCK_EFFECT | flags2, fn);
  return effect2;
}
function branch(fn) {
  return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn);
}
function execute_effect_teardown(effect2) {
  var teardown2 = effect2.teardown;
  if (teardown2 !== null) {
    const previously_destroying_effect = is_destroying_effect;
    const previous_reaction = active_reaction;
    set_is_destroying_effect(true);
    set_active_reaction(null);
    try {
      teardown2.call(null);
    } catch (error) {
      invoke_error_boundary(error, effect2.parent);
    } finally {
      set_is_destroying_effect(previously_destroying_effect);
      set_active_reaction(previous_reaction);
    }
  }
}
function destroy_effect_children(signal, remove_dom = false) {
  var effect2 = signal.first;
  signal.first = signal.last = null;
  while (effect2 !== null) {
    const controller = effect2.ac;
    if (controller !== null) {
      without_reactive_context(() => {
        controller.abort(STALE_REACTION);
      });
    }
    var next = effect2.next;
    if ((effect2.f & ROOT_EFFECT) !== 0) {
      effect2.parent = null;
    } else {
      destroy_effect(effect2, remove_dom);
    }
    effect2 = next;
  }
}
function destroy_block_effect_children(signal) {
  var effect2 = signal.first;
  while (effect2 !== null) {
    var next = effect2.next;
    if ((effect2.f & BRANCH_EFFECT) === 0) {
      destroy_effect(effect2);
    }
    effect2 = next;
  }
}
function destroy_effect(effect2, remove_dom = true) {
  var removed = false;
  if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes !== null && effect2.nodes.end !== null) {
    remove_effect_dom(
      effect2.nodes.start,
      /** @type {TemplateNode} */
      effect2.nodes.end
    );
    removed = true;
  }
  effect2.f |= DESTROYING;
  destroy_effect_children(effect2, remove_dom && !removed);
  remove_reactions(effect2, 0);
  var transitions = effect2.nodes && effect2.nodes.t;
  if (transitions !== null) {
    for (const transition of transitions) {
      transition.stop();
    }
  }
  execute_effect_teardown(effect2);
  effect2.f ^= DESTROYING;
  effect2.f |= DESTROYED;
  var parent = effect2.parent;
  if (parent !== null && parent.first !== null) {
    unlink_effect(effect2);
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes = effect2.ac = effect2.b = null;
}
function remove_effect_dom(node, end) {
  while (node !== null) {
    var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
    node.remove();
    node = next;
  }
}
function unlink_effect(effect2) {
  var parent = effect2.parent;
  var prev = effect2.prev;
  var next = effect2.next;
  if (prev !== null) prev.next = next;
  if (next !== null) next.prev = prev;
  if (parent !== null) {
    if (parent.first === effect2) parent.first = next;
    if (parent.last === effect2) parent.last = prev;
  }
}
function pause_effect(effect2, callback, destroy = true) {
  var transitions = [];
  effect2.f |= PAUSED;
  pause_children(effect2, transitions, true);
  var fn = () => {
    if (destroy) destroy_effect(effect2);
    if (callback) callback();
  };
  var remaining = transitions.length;
  if (remaining > 0) {
    var check = () => --remaining || fn();
    for (var transition of transitions) {
      transition.out(check);
    }
  } else {
    fn();
  }
}
function pause_children(effect2, transitions, local) {
  if ((effect2.f & INERT) !== 0) return;
  effect2.f ^= INERT;
  var t = effect2.nodes && effect2.nodes.t;
  if (t !== null) {
    for (const transition of t) {
      if (transition.is_global || local) {
        transitions.push(transition);
      }
    }
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    if ((child2.f & ROOT_EFFECT) === 0) {
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (child2.f & BRANCH_EFFECT) !== 0 && (effect2.f & BLOCK_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
    }
    child2 = sibling2;
  }
}
function resume_effect(effect2) {
  effect2.f &= ~PAUSED;
  resume_children(effect2, true);
}
function resume_children(effect2, local) {
  if ((effect2.f & PAUSED) !== 0) return;
  if ((effect2.f & INERT) === 0) return;
  effect2.f ^= INERT;
  if ((effect2.f & CLEAN) === 0) {
    set_signal_status(effect2, DIRTY);
    Batch.ensure().schedule(effect2);
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
    resume_children(child2, transparent ? local : false);
    child2 = sibling2;
  }
  var t = effect2.nodes && effect2.nodes.t;
  if (t !== null) {
    for (const transition of t) {
      if (transition.is_global || local) {
        transition.in();
      }
    }
  }
}
function move_effect(effect2, fragment) {
  if (!effect2.nodes) return;
  var node = effect2.nodes.start;
  var end = effect2.nodes.end;
  while (node !== null) {
    var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
    fragment.append(node);
    node = next;
  }
}
let is_destroying_effect = false;
function set_is_destroying_effect(value) {
  is_destroying_effect = value;
}
let active_reaction = null;
let untracking = false;
function set_active_reaction(reaction) {
  active_reaction = reaction;
}
let active_effect = null;
function set_active_effect(effect2) {
  active_effect = effect2;
}
let current_sources = null;
function push_reaction_value(value) {
  if (active_reaction !== null && ((active_reaction.f & REACTION_IS_UPDATING) !== 0 || (active_reaction.f & DERIVED) !== 0)) {
    (current_sources ?? (current_sources = /* @__PURE__ */ new Set())).add(value);
  }
}
let new_deps = null;
let skipped_deps = 0;
let untracked_writes = null;
function set_untracked_writes(value) {
  untracked_writes = value;
}
let write_version = 1;
let read_version = 0;
let update_version = read_version;
function set_update_version(value) {
  update_version = value;
}
function increment_write_version() {
  return ++write_version;
}
function is_dirty(reaction) {
  var flags2 = reaction.f;
  if ((flags2 & DIRTY) !== 0) {
    return true;
  }
  if ((flags2 & MAYBE_DIRTY) !== 0) {
    var dependencies = (
      /** @type {Value[]} */
      reaction.deps
    );
    var length = dependencies.length;
    for (var i = 0; i < length; i++) {
      var dependency = dependencies[i];
      if (is_dirty(
        /** @type {Derived} */
        dependency
      )) {
        update_derived(
          /** @type {Derived} */
          dependency
        );
      }
      if (dependency.wv > reaction.wv) {
        return true;
      }
    }
    if ((flags2 & CONNECTED) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    batch_values === null) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  if (current_sources !== null && current_sources.has(signal)) {
    return;
  }
  for (var i = 0; i < reactions.length; i++) {
    var reaction = reactions[i];
    if ((reaction.f & DERIVED) !== 0) {
      schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        reaction,
        effect2,
        false
      );
    } else if (effect2 === reaction) {
      if (root2) {
        set_signal_status(reaction, DIRTY);
      } else if ((reaction.f & CLEAN) !== 0) {
        set_signal_status(reaction, MAYBE_DIRTY);
      }
      schedule_effect(
        /** @type {Effect} */
        reaction
      );
    }
  }
}
function update_reaction(reaction) {
  var previous_deps = new_deps;
  var previous_skipped_deps = skipped_deps;
  var previous_untracked_writes = untracked_writes;
  var previous_reaction = active_reaction;
  var previous_sources = current_sources;
  var previous_component_context = component_context;
  var previous_untracking = untracking;
  var previous_update_version = update_version;
  var flags2 = reaction.f;
  new_deps = /** @type {null | Value[]} */
  null;
  skipped_deps = 0;
  untracked_writes = null;
  active_reaction = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
  current_sources = null;
  set_component_context(reaction.ctx);
  untracking = false;
  update_version = ++read_version;
  if (reaction.ac !== null) {
    without_reactive_context(() => {
      reaction.ac.abort(STALE_REACTION);
    });
    reaction.ac = null;
  }
  try {
    reaction.f |= REACTION_IS_UPDATING;
    var fn = (
      /** @type {Function} */
      reaction.fn
    );
    var result = fn();
    reaction.f |= REACTION_RAN;
    var deps = update_dependencies(reaction);
    if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
      for (var i = 0; i < /** @type {Source[]} */
      untracked_writes.length; i++) {
        schedule_possible_effect_self_invalidation(
          untracked_writes[i],
          /** @type {Effect} */
          reaction
        );
      }
    }
    if (previous_reaction !== null && previous_reaction !== reaction) {
      read_version++;
      if (previous_reaction.deps !== null) {
        for (let i2 = 0; i2 < previous_skipped_deps; i2 += 1) {
          previous_reaction.deps[i2].rv = read_version;
        }
      }
      if (previous_deps !== null) {
        for (const dep of previous_deps) {
          dep.rv = read_version;
        }
      }
      if (untracked_writes !== null) {
        if (previous_untracked_writes === null) {
          previous_untracked_writes = untracked_writes;
        } else {
          previous_untracked_writes.push(.../** @type {Source[]} */
          untracked_writes);
        }
      }
    }
    if ((reaction.f & ERROR_VALUE) !== 0) {
      reaction.f ^= ERROR_VALUE;
    }
    return result;
  } catch (error) {
    update_dependencies(reaction);
    return handle_error(error);
  } finally {
    reaction.f ^= REACTION_IS_UPDATING;
    new_deps = previous_deps;
    skipped_deps = previous_skipped_deps;
    untracked_writes = previous_untracked_writes;
    active_reaction = previous_reaction;
    current_sources = previous_sources;
    set_component_context(previous_component_context);
    untracking = previous_untracking;
    update_version = previous_update_version;
  }
}
function update_dependencies(reaction) {
  var _a2;
  var deps = reaction.deps;
  var is_fork = current_batch == null ? void 0 : current_batch.is_fork;
  if (new_deps !== null) {
    var i;
    if (!is_fork) {
      remove_reactions(reaction, skipped_deps);
    }
    if (deps !== null && skipped_deps > 0) {
      deps.length = skipped_deps + new_deps.length;
      for (i = 0; i < new_deps.length; i++) {
        deps[skipped_deps + i] = new_deps[i];
      }
    } else {
      reaction.deps = deps = new_deps;
    }
    if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
      for (i = skipped_deps; i < deps.length; i++) {
        ((_a2 = deps[i]).reactions ?? (_a2.reactions = [])).push(reaction);
      }
    }
  } else if (!is_fork && deps !== null && skipped_deps < deps.length) {
    remove_reactions(reaction, skipped_deps);
    deps.length = skipped_deps;
  }
  return deps;
}
function remove_reaction(signal, dependency) {
  let reactions = dependency.reactions;
  if (reactions !== null) {
    var index2 = index_of.call(reactions, signal);
    if (index2 !== -1) {
      var new_length = reactions.length - 1;
      if (new_length === 0) {
        reactions = dependency.reactions = null;
      } else {
        reactions[index2] = reactions[new_length];
        reactions.pop();
      }
    }
  }
  if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (new_deps === null || !includes.call(new_deps, dependency))) {
    var derived2 = (
      /** @type {Derived} */
      dependency
    );
    if ((derived2.f & CONNECTED) !== 0) {
      derived2.f ^= CONNECTED;
    }
    if (derived2.v !== UNINITIALIZED) {
      update_derived_status(derived2);
    }
    if (derived2.ac !== null) {
      without_reactive_context(() => {
        derived2.ac.abort(STALE_REACTION);
        derived2.ac = null;
        set_signal_status(derived2, DIRTY);
      });
    }
    freeze_derived_effects(derived2);
    remove_reactions(derived2, 0);
  }
}
function remove_reactions(signal, start_index) {
  var dependencies = signal.deps;
  if (dependencies === null) return;
  for (var i = start_index; i < dependencies.length; i++) {
    remove_reaction(signal, dependencies[i]);
  }
}
function update_effect(effect2) {
  var flags2 = effect2.f;
  if ((flags2 & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var previous_effect = active_effect;
  active_effect = effect2;
  try {
    if ((flags2 & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
      destroy_block_effect_children(effect2);
    } else {
      destroy_effect_children(effect2);
    }
    execute_effect_teardown(effect2);
    var teardown2 = update_reaction(effect2);
    effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
    effect2.wv = write_version;
    var dep;
    if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) ;
  } finally {
    active_effect = previous_effect;
  }
}
async function tick() {
  await Promise.resolve();
  flushSync();
}
function get(signal) {
  var flags2 = signal.f;
  var is_derived = (flags2 & DERIVED) !== 0;
  if (active_reaction !== null && !untracking) {
    var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
    if (!destroyed && (current_sources === null || !current_sources.has(signal))) {
      var deps = active_reaction.deps;
      if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
        if (signal.rv < read_version) {
          signal.rv = read_version;
          if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
            skipped_deps++;
          } else if (new_deps === null) {
            new_deps = [signal];
          } else {
            new_deps.push(signal);
          }
        }
      } else {
        active_reaction.deps ?? (active_reaction.deps = []);
        if (!includes.call(active_reaction.deps, signal)) {
          active_reaction.deps.push(signal);
        }
        var reactions = signal.reactions;
        if (reactions === null) {
          signal.reactions = [active_reaction];
        } else if (!includes.call(reactions, active_reaction)) {
          reactions.push(active_reaction);
        }
      }
    }
  }
  if (is_destroying_effect && old_values.has(signal)) {
    return old_values.get(signal);
  }
  if (is_derived) {
    var derived2 = (
      /** @type {Derived} */
      signal
    );
    if (is_destroying_effect) {
      var value = derived2.v;
      if ((derived2.f & CLEAN) === 0 && derived2.reactions !== null || depends_on_old_values(derived2)) {
        value = execute_derived(derived2);
      }
      old_values.set(derived2, value);
      return value;
    }
    var should_connect = (derived2.f & CONNECTED) === 0 && !untracking && active_reaction !== null && (active_reaction.f & CONNECTED) !== 0;
    var is_new = (derived2.f & REACTION_RAN) === 0;
    if (is_dirty(derived2)) {
      if (should_connect) {
        derived2.f |= CONNECTED;
      }
      update_derived(derived2);
    }
    if (should_connect && !is_new) {
      unfreeze_derived_effects(derived2);
      reconnect(derived2);
    }
  }
  if (batch_values == null ? void 0 : batch_values.has(signal)) {
    return batch_values.get(signal);
  }
  if ((signal.f & ERROR_VALUE) !== 0) {
    throw signal.v;
  }
  return signal.v;
}
function reconnect(derived2) {
  derived2.f |= CONNECTED;
  if (derived2.deps === null) return;
  for (const dep of derived2.deps) {
    var reactions = dep.reactions;
    if (reactions === null) {
      dep.reactions = [derived2];
    } else if (!includes.call(reactions, derived2)) {
      reactions.push(derived2);
    }
    if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
      unfreeze_derived_effects(
        /** @type {Derived} */
        dep
      );
      reconnect(
        /** @type {Derived} */
        dep
      );
    }
  }
}
function depends_on_old_values(derived2) {
  if (derived2.v === UNINITIALIZED) return true;
  if (derived2.deps === null) return false;
  for (const dep of derived2.deps) {
    if (old_values.has(dep)) {
      return true;
    }
    if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
      /** @type {Derived} */
      dep
    )) {
      return true;
    }
  }
  return false;
}
function untrack(fn) {
  var previous_untracking = untracking;
  try {
    untracking = true;
    return fn();
  } finally {
    untracking = previous_untracking;
  }
}
function deep_read_state(value) {
  if (typeof value !== "object" || !value || value instanceof EventTarget) {
    return;
  }
  if (STATE_SYMBOL in value) {
    deep_read(value);
  } else if (!Array.isArray(value)) {
    for (let key2 in value) {
      const prop2 = value[key2];
      if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
        deep_read(prop2);
      }
    }
  }
}
function deep_read(value, visited = /* @__PURE__ */ new Set()) {
  if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
  !(value instanceof EventTarget) && !visited.has(value)) {
    visited.add(value);
    if (value instanceof Date) {
      value.getTime();
    }
    for (let key2 in value) {
      try {
        deep_read(value[key2], visited);
      } catch (e) {
      }
    }
    const proto = get_prototype_of(value);
    if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
      const descriptors = get_descriptors(proto);
      for (let key2 in descriptors) {
        const get2 = descriptors[key2].get;
        if (get2) {
          try {
            get2.call(value);
          } catch (e) {
          }
        }
      }
    }
  }
}
const PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(name) {
  return PASSIVE_EVENTS.includes(name);
}
const event_symbol = Symbol("events");
const all_registered_events = /* @__PURE__ */ new Set();
const root_event_handles = /* @__PURE__ */ new Set();
function delegated(event_name, element, handler) {
  (element[event_symbol] ?? (element[event_symbol] = {}))[event_name] = handler;
}
function delegate(events) {
  for (var i = 0; i < events.length; i++) {
    all_registered_events.add(events[i]);
  }
  for (var fn of root_event_handles) {
    fn(events);
  }
}
let last_propagated_event = null;
let last_propagated_event_clear_scheduled = false;
function handle_event_propagation(event) {
  var _a2, _b2;
  var handler_element = this;
  var owner_document = (
    /** @type {Node} */
    handler_element.ownerDocument
  );
  var event_name = event.type;
  var path = ((_a2 = event.composedPath) == null ? void 0 : _a2.call(event)) || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event.target
  );
  last_propagated_event = event;
  if (!last_propagated_event_clear_scheduled) {
    last_propagated_event_clear_scheduled = true;
    setTimeout(() => {
      last_propagated_event_clear_scheduled = false;
      last_propagated_event = null;
    });
  }
  var path_idx = 0;
  var handled_at = last_propagated_event === event && event[event_symbol];
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event[event_symbol] = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event.target;
  if (current_target === handler_element) return;
  define_property(event, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    var throw_error;
    var other_errors = [];
    while (current_target !== null) {
      if (current_target === handler_element) break;
      try {
        var delegated2 = (_b2 = current_target[event_symbol]) == null ? void 0 : _b2[event_name];
        if (delegated2 != null && (!/** @type {any} */
        current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
        // -> the target could not have been disabled because it emits the event in the first place
        event.target === current_target)) {
          delegated2.call(current_target, event);
        }
      } catch (error) {
        if (throw_error) {
          other_errors.push(error);
        } else {
          throw_error = error;
        }
      }
      if (event.cancelBubble) break;
      path_idx++;
      current_target = path_idx < path.length ? (
        /** @type {Element} */
        path[path_idx]
      ) : null;
    }
    if (throw_error) {
      for (let error of other_errors) {
        queueMicrotask(() => {
          throw error;
        });
      }
      throw throw_error;
    }
  } finally {
    event[event_symbol] = handler_element;
    delete event.currentTarget;
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
const policy = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((_a = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : _a.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (html) => {
      return html;
    }
  })
);
function create_trusted_html(html) {
  return (
    /** @type {string} */
    (policy == null ? void 0 : policy.createHTML(html)) ?? html
  );
}
function create_fragment_from_html(html) {
  var elem = create_element("template");
  elem.innerHTML = create_trusted_html(html.replaceAll("<!>", "<!---->"));
  return elem.content;
}
function assign_nodes(start, end) {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  if (effect2.nodes === null) {
    effect2.nodes = { start, end, a: null, t: null };
  }
}
// @__NO_SIDE_EFFECTS__
function from_html(content, flags2) {
  var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
  var use_import_node = (flags2 & TEMPLATE_USE_IMPORT_NODE) !== 0;
  var node;
  var has_start = !content.startsWith("<!>");
  return () => {
    if (node === void 0) {
      node = create_fragment_from_html(has_start ? content : "<!>" + content);
      if (!is_fragment) node = /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(node);
    }
    var clone = (
      /** @type {TemplateNode} */
      use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
    );
    if (is_fragment) {
      var start = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(clone)
      );
      var end = (
        /** @type {TemplateNode} */
        clone.lastChild
      );
      assign_nodes(start, end);
    } else {
      assign_nodes(clone, clone);
    }
    return clone;
  };
}
// @__NO_SIDE_EFFECTS__
function from_namespace(content, flags2, ns = "svg") {
  var has_start = !content.startsWith("<!>");
  var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
  var wrapped = `<${ns}>${has_start ? content : "<!>" + content}</${ns}>`;
  var node;
  return () => {
    if (!node) {
      var fragment = (
        /** @type {DocumentFragment} */
        create_fragment_from_html(wrapped)
      );
      var root2 = (
        /** @type {Element} */
        /* @__PURE__ */ get_first_child(fragment)
      );
      if (is_fragment) {
        node = document.createDocumentFragment();
        while (/* @__PURE__ */ get_first_child(root2)) {
          node.appendChild(
            /** @type {TemplateNode} */
            /* @__PURE__ */ get_first_child(root2)
          );
        }
      } else {
        node = /** @type {Element} */
        /* @__PURE__ */ get_first_child(root2);
      }
    }
    var clone = (
      /** @type {TemplateNode} */
      node.cloneNode(true)
    );
    if (is_fragment) {
      var start = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(clone)
      );
      var end = (
        /** @type {TemplateNode} */
        clone.lastChild
      );
      assign_nodes(start, end);
    } else {
      assign_nodes(clone, clone);
    }
    return clone;
  };
}
// @__NO_SIDE_EFFECTS__
function from_svg(content, flags2) {
  return /* @__PURE__ */ from_namespace(content, flags2, "svg");
}
function append(anchor, dom) {
  if (anchor === null) {
    return;
  }
  anchor.before(
    /** @type {Node} */
    dom
  );
}
function createSubscriber(start) {
  let subscribers = 0;
  let version = source(0);
  let stop;
  return () => {
    if (effect_tracking()) {
      get(version);
      render_effect(() => {
        if (subscribers === 0) {
          stop = untrack(() => start(() => increment(version)));
        }
        subscribers += 1;
        return () => {
          queue_micro_task(() => {
            subscribers -= 1;
            if (subscribers === 0) {
              stop == null ? void 0 : stop();
              stop = void 0;
              increment(version);
            }
          });
        };
      });
    }
  };
}
var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
function boundary(node, props, children, transform_error) {
  new Boundary(node, props, children, transform_error);
}
class Boundary {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(node, props, children, transform_error) {
    __privateAdd(this, _Boundary_instances);
    /** @type {Boundary | null} */
    __publicField(this, "parent");
    __publicField(this, "is_pending", false);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    __publicField(this, "transform_error");
    /** @type {TemplateNode} */
    __privateAdd(this, _anchor);
    /** @type {TemplateNode | null} */
    __privateAdd(this, _hydrate_open, null);
    /** @type {BoundaryProps} */
    __privateAdd(this, _props);
    /** @type {((anchor: Node) => void)} */
    __privateAdd(this, _children);
    /** @type {Effect} */
    __privateAdd(this, _effect);
    /** @type {Effect | null} */
    __privateAdd(this, _main_effect, null);
    /** @type {Effect | null} */
    __privateAdd(this, _pending_effect, null);
    /** @type {Effect | null} */
    __privateAdd(this, _failed_effect, null);
    /** @type {DocumentFragment | null} */
    __privateAdd(this, _offscreen_fragment, null);
    __privateAdd(this, _local_pending_count, 0);
    __privateAdd(this, _pending_count, 0);
    __privateAdd(this, _pending_count_update_queued, false);
    /** @type {Map<Effect, number>} */
    __privateAdd(this, _dirty_reactions2, /* @__PURE__ */ new Map());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    __privateAdd(this, _effect_pending, null);
    __privateAdd(this, _effect_pending_subscriber, createSubscriber(() => {
      __privateSet(this, _effect_pending, source(__privateGet(this, _local_pending_count)));
      return () => {
        __privateSet(this, _effect_pending, null);
      };
    }));
    var _a2;
    __privateSet(this, _anchor, node);
    __privateSet(this, _props, props);
    __privateSet(this, _children, (anchor) => {
      var effect2 = (
        /** @type {Effect} */
        active_effect
      );
      effect2.b = this;
      effect2.f |= BOUNDARY_EFFECT;
      children(anchor);
    });
    this.parent = /** @type {Effect} */
    active_effect.b;
    this.transform_error = transform_error ?? ((_a2 = this.parent) == null ? void 0 : _a2.transform_error) ?? ((e) => e);
    __privateSet(this, _effect, block(() => {
      {
        __privateMethod(this, _Boundary_instances, render_fn).call(this);
      }
    }, flags));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(effect2) {
    defer_effect(effect2, __privateGet(this, _dirty_reactions2));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!__privateGet(this, _props).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(d, batch) {
    __privateMethod(this, _Boundary_instances, update_pending_count_fn).call(this, d, batch);
    __privateSet(this, _local_pending_count, __privateGet(this, _local_pending_count) + d);
    if (!__privateGet(this, _effect_pending) || __privateGet(this, _pending_count_update_queued)) return;
    __privateSet(this, _pending_count_update_queued, true);
    queue_micro_task(() => {
      __privateSet(this, _pending_count_update_queued, false);
      if (__privateGet(this, _effect_pending)) {
        internal_set(__privateGet(this, _effect_pending), __privateGet(this, _local_pending_count));
      }
    });
  }
  get_effect_pending() {
    __privateGet(this, _effect_pending_subscriber).call(this);
    return get(
      /** @type {Source<number>} */
      __privateGet(this, _effect_pending)
    );
  }
  /** @param {unknown} error */
  error(error) {
    if (error === HYDRATION_ERROR) {
      throw error;
    }
    if (!__privateGet(this, _props).onerror && !__privateGet(this, _props).failed) {
      throw error;
    }
    if (current_batch == null ? void 0 : current_batch.is_fork) {
      if (__privateGet(this, _main_effect)) current_batch.skip_effect(__privateGet(this, _main_effect));
      if (__privateGet(this, _pending_effect)) current_batch.skip_effect(__privateGet(this, _pending_effect));
      if (__privateGet(this, _failed_effect)) current_batch.skip_effect(__privateGet(this, _failed_effect));
      current_batch.oncommit(() => {
        if (!__privateMethod(this, _Boundary_instances, is_destroyed_fn).call(this)) __privateMethod(this, _Boundary_instances, handle_error_fn).call(this, error);
      });
    } else {
      __privateMethod(this, _Boundary_instances, handle_error_fn).call(this, error);
    }
  }
}
_anchor = new WeakMap();
_hydrate_open = new WeakMap();
_props = new WeakMap();
_children = new WeakMap();
_effect = new WeakMap();
_main_effect = new WeakMap();
_pending_effect = new WeakMap();
_failed_effect = new WeakMap();
_offscreen_fragment = new WeakMap();
_local_pending_count = new WeakMap();
_pending_count = new WeakMap();
_pending_count_update_queued = new WeakMap();
_dirty_reactions2 = new WeakMap();
_effect_pending = new WeakMap();
_effect_pending_subscriber = new WeakMap();
_Boundary_instances = new WeakSet();
hydrate_resolved_content_fn = function() {
  try {
    __privateSet(this, _main_effect, branch(() => __privateGet(this, _children).call(this, __privateGet(this, _anchor))));
  } catch (error) {
    this.error(error);
  }
};
/**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
hydrate_failed_content_fn = function(error) {
  const failed = __privateGet(this, _props).failed;
  const { reset, invoke_onerror } = __privateMethod(this, _Boundary_instances, create_reset_fn).call(this, error);
  queue_micro_task(invoke_onerror);
  if (!failed) return;
  __privateSet(this, _failed_effect, branch(() => {
    failed(
      __privateGet(this, _anchor),
      () => error,
      () => reset
    );
  }));
};
/**
 * Creates the `reset` function for a failed boundary, along with a function
 * that invokes `onerror` with it (if provided)
 * @param {unknown} error
 * @returns {{ reset: () => void, invoke_onerror: () => void }}
 */
create_reset_fn = function(error) {
  var did_reset = false;
  var calling_on_error = false;
  const reset = () => {
    if (__privateMethod(this, _Boundary_instances, is_destroyed_fn).call(this)) return;
    if (did_reset) {
      svelte_boundary_reset_noop();
      return;
    }
    did_reset = true;
    if (calling_on_error) {
      svelte_boundary_reset_onerror();
    }
    if (__privateGet(this, _failed_effect) !== null) {
      pause_effect(__privateGet(this, _failed_effect), () => {
        __privateSet(this, _failed_effect, null);
      });
    }
    __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
      __privateMethod(this, _Boundary_instances, render_fn).call(this);
    });
  };
  const invoke_onerror = () => {
    var _a2, _b2;
    if (__privateMethod(this, _Boundary_instances, is_destroyed_fn).call(this)) return;
    try {
      calling_on_error = true;
      (_b2 = (_a2 = __privateGet(this, _props)).onerror) == null ? void 0 : _b2.call(_a2, error, reset);
      calling_on_error = false;
    } catch (err) {
      invoke_error_boundary(err, __privateGet(this, _effect) && __privateGet(this, _effect).parent);
    }
  };
  return { reset, invoke_onerror };
};
is_destroyed_fn = function() {
  return (__privateGet(this, _effect).f & (DESTROYED | DESTROYING)) !== 0;
};
hydrate_pending_content_fn = function() {
  const pending = __privateGet(this, _props).pending;
  if (!pending) return;
  this.is_pending = true;
  __privateSet(this, _pending_effect, branch(() => pending(__privateGet(this, _anchor))));
  queue_micro_task(() => {
    if (__privateMethod(this, _Boundary_instances, is_destroyed_fn).call(this)) return;
    var fragment = __privateSet(this, _offscreen_fragment, document.createDocumentFragment());
    var anchor = create_text();
    var handled = false;
    fragment.append(anchor);
    __privateSet(this, _main_effect, __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
      try {
        return branch(() => __privateGet(this, _children).call(this, anchor));
      } catch (error) {
        try {
          this.error(error);
          handled = true;
        } catch (error2) {
          invoke_error_boundary(error2, __privateGet(this, _effect).parent);
        }
        return null;
      }
    }));
    if (__privateGet(this, _main_effect) === null) {
      __privateSet(this, _offscreen_fragment, null);
      if (handled) __privateMethod(this, _Boundary_instances, resolve_fn2).call(
        this,
        /** @type {Batch} */
        current_batch
      );
      return;
    }
    if (__privateGet(this, _pending_count) === 0) {
      __privateGet(this, _anchor).before(fragment);
      __privateSet(this, _offscreen_fragment, null);
      pause_effect(
        /** @type {Effect} */
        __privateGet(this, _pending_effect),
        () => {
          __privateSet(this, _pending_effect, null);
        }
      );
      __privateMethod(this, _Boundary_instances, resolve_fn2).call(
        this,
        /** @type {Batch} */
        current_batch
      );
    }
  });
};
render_fn = function() {
  try {
    this.is_pending = this.has_pending_snippet();
    __privateSet(this, _pending_count, 0);
    __privateSet(this, _local_pending_count, 0);
    __privateSet(this, _main_effect, branch(() => {
      __privateGet(this, _children).call(this, __privateGet(this, _anchor));
    }));
    if (__privateGet(this, _pending_count) > 0) {
      var fragment = __privateSet(this, _offscreen_fragment, document.createDocumentFragment());
      move_effect(__privateGet(this, _main_effect), fragment);
      const pending = (
        /** @type {(anchor: Node) => void} */
        __privateGet(this, _props).pending
      );
      __privateSet(this, _pending_effect, branch(() => pending(__privateGet(this, _anchor))));
    } else {
      __privateMethod(this, _Boundary_instances, resolve_fn2).call(
        this,
        /** @type {Batch} */
        current_batch
      );
    }
  } catch (error) {
    this.error(error);
  }
};
/**
 * @param {Batch} batch
 */
resolve_fn2 = function(batch) {
  this.is_pending = false;
  batch.transfer_reactions(__privateGet(this, _dirty_reactions2));
};
/**
 * @template T
 * @param {() => T} fn
 */
run_fn = function(fn) {
  var previous_effect = active_effect;
  var previous_reaction = active_reaction;
  var previous_ctx = component_context;
  set_active_effect(__privateGet(this, _effect));
  set_active_reaction(__privateGet(this, _effect));
  set_component_context(__privateGet(this, _effect).ctx);
  try {
    Batch.ensure();
    return fn();
  } finally {
    set_active_effect(previous_effect);
    set_active_reaction(previous_reaction);
    set_component_context(previous_ctx);
  }
};
/**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
update_pending_count_fn = function(d, batch) {
  var _a2;
  if (!this.has_pending_snippet()) {
    if (this.parent) {
      __privateMethod(_a2 = this.parent, _Boundary_instances, update_pending_count_fn).call(_a2, d, batch);
    }
    return;
  }
  __privateSet(this, _pending_count, __privateGet(this, _pending_count) + d);
  if (__privateGet(this, _pending_count) === 0) {
    __privateMethod(this, _Boundary_instances, resolve_fn2).call(this, batch);
    if (__privateGet(this, _pending_effect)) {
      pause_effect(__privateGet(this, _pending_effect), () => {
        __privateSet(this, _pending_effect, null);
      });
    }
    if (__privateGet(this, _offscreen_fragment)) {
      __privateGet(this, _anchor).before(__privateGet(this, _offscreen_fragment));
      __privateSet(this, _offscreen_fragment, null);
    }
  }
};
/**
 * @param {unknown} error
 */
handle_error_fn = function(error) {
  if (__privateGet(this, _main_effect)) {
    destroy_effect(__privateGet(this, _main_effect));
    __privateSet(this, _main_effect, null);
  }
  if (__privateGet(this, _pending_effect)) {
    destroy_effect(__privateGet(this, _pending_effect));
    __privateSet(this, _pending_effect, null);
  }
  if (__privateGet(this, _failed_effect)) {
    destroy_effect(__privateGet(this, _failed_effect));
    __privateSet(this, _failed_effect, null);
  }
  let failed = __privateGet(this, _props).failed;
  const handle_error_result = (transformed_error) => {
    if (__privateMethod(this, _Boundary_instances, is_destroyed_fn).call(this)) return;
    const { reset, invoke_onerror } = __privateMethod(this, _Boundary_instances, create_reset_fn).call(this, transformed_error);
    invoke_onerror();
    if (failed && !__privateMethod(this, _Boundary_instances, is_destroyed_fn).call(this)) {
      __privateSet(this, _failed_effect, __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
        try {
          return branch(() => {
            var effect2 = (
              /** @type {Effect} */
              active_effect
            );
            effect2.b = this;
            effect2.f |= BOUNDARY_EFFECT;
            failed(
              __privateGet(this, _anchor),
              () => transformed_error,
              () => reset
            );
          });
        } catch (error2) {
          invoke_error_boundary(
            error2,
            /** @type {Effect} */
            __privateGet(this, _effect).parent
          );
          return null;
        }
      }));
    }
  };
  queue_micro_task(() => {
    if (__privateMethod(this, _Boundary_instances, is_destroyed_fn).call(this)) return;
    var result;
    try {
      result = this.transform_error(error);
    } catch (e) {
      invoke_error_boundary(e, __privateGet(this, _effect) && __privateGet(this, _effect).parent);
      return;
    }
    if (result !== null && typeof result === "object" && typeof /** @type {any} */
    result.then === "function") {
      result.then(
        handle_error_result,
        /** @param {unknown} e */
        (e) => invoke_error_boundary(e, __privateGet(this, _effect) && __privateGet(this, _effect).parent)
      );
    } else {
      handle_error_result(result);
    }
  });
};
function set_text(text, value) {
  var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
  if (str !== /** @type {any} */
  (text[TEXT_CACHE] ?? (text[TEXT_CACHE] = text.nodeValue))) {
    text[TEXT_CACHE] = str;
    text.nodeValue = `${str}`;
  }
}
function mount(component, options) {
  return _mount(component, options);
}
const listeners = /* @__PURE__ */ new Map();
function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
  init_operations();
  var component = void 0;
  var unmount = component_root(() => {
    var anchor_node = anchor ?? target.appendChild(create_text());
    boundary(
      /** @type {TemplateNode} */
      anchor_node,
      {
        pending: () => {
        }
      },
      (anchor_node2) => {
        push({});
        var ctx = (
          /** @type {ComponentContext} */
          component_context
        );
        if (context) ctx.c = context;
        if (events) {
          props.$$events = events;
        }
        component = Component(anchor_node2, props) || mark_as_component();
        pop();
      },
      transformError
    );
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive = is_passive_event(event_name);
        for (const node of [target, document]) {
          var counts = listeners.get(node);
          if (counts === void 0) {
            counts = /* @__PURE__ */ new Map();
            listeners.set(node, counts);
          }
          var count = counts.get(event_name);
          if (count === void 0) {
            node.addEventListener(event_name, handle_event_propagation, { passive });
            counts.set(event_name, 1);
          } else {
            counts.set(event_name, count + 1);
          }
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    return () => {
      var _a2;
      for (var event_name of registered_events) {
        for (const node of [target, document]) {
          var counts = (
            /** @type {Map<string, number>} */
            listeners.get(node)
          );
          var count = (
            /** @type {number} */
            counts.get(event_name)
          );
          if (--count == 0) {
            node.removeEventListener(event_name, handle_event_propagation);
            counts.delete(event_name);
            if (counts.size === 0) {
              listeners.delete(node);
            }
          } else {
            counts.set(event_name, count);
          }
        }
      }
      root_event_handles.delete(event_handle);
      if (anchor_node !== anchor) {
        (_a2 = anchor_node.parentNode) == null ? void 0 : _a2.removeChild(anchor_node);
      }
    };
  });
  mounted_components.set(component, unmount);
  return component;
}
let mounted_components = /* @__PURE__ */ new WeakMap();
class BranchManager {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(anchor, transition = true) {
    /** @type {TemplateNode} */
    __publicField(this, "anchor");
    /** @type {Map<Batch, Key>} */
    __privateAdd(this, _batches, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    __privateAdd(this, _onscreen, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    __privateAdd(this, _offscreen, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    __privateAdd(this, _outroing, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    __privateAdd(this, _transition, true);
    /**
     * @param {Batch} batch
     */
    __privateAdd(this, _commit, (batch) => {
      if (!__privateGet(this, _batches).has(batch)) return;
      var key2 = (
        /** @type {Key} */
        __privateGet(this, _batches).get(batch)
      );
      var onscreen = __privateGet(this, _onscreen).get(key2);
      if (onscreen) {
        resume_effect(onscreen);
        __privateGet(this, _outroing).delete(key2);
      } else {
        var offscreen = __privateGet(this, _offscreen).get(key2);
        if (offscreen) {
          resume_effect(offscreen.effect);
          __privateGet(this, _onscreen).set(key2, offscreen.effect);
          __privateGet(this, _offscreen).delete(key2);
          offscreen.fragment.lastChild.remove();
          this.anchor.before(offscreen.fragment);
          onscreen = offscreen.effect;
        }
      }
      for (const [b, k] of __privateGet(this, _batches)) {
        __privateGet(this, _batches).delete(b);
        if (b === batch) {
          break;
        }
        const offscreen2 = __privateGet(this, _offscreen).get(k);
        if (offscreen2) {
          destroy_effect(offscreen2.effect);
          __privateGet(this, _offscreen).delete(k);
        }
      }
      for (const [k, effect2] of __privateGet(this, _onscreen)) {
        if (k === key2 || __privateGet(this, _outroing).has(k)) continue;
        const on_destroy = () => {
          const keys = Array.from(__privateGet(this, _batches).values());
          if (keys.includes(k)) {
            var fragment = document.createDocumentFragment();
            move_effect(effect2, fragment);
            fragment.append(create_text());
            __privateGet(this, _offscreen).set(k, { effect: effect2, fragment });
          } else {
            destroy_effect(effect2);
          }
          __privateGet(this, _outroing).delete(k);
          __privateGet(this, _onscreen).delete(k);
        };
        if (__privateGet(this, _transition) || !onscreen) {
          __privateGet(this, _outroing).add(k);
          pause_effect(effect2, on_destroy, false);
        } else {
          on_destroy();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    __privateAdd(this, _discard, (batch) => {
      __privateGet(this, _batches).delete(batch);
      const keys = Array.from(__privateGet(this, _batches).values());
      for (const [k, branch2] of __privateGet(this, _offscreen)) {
        if (!keys.includes(k)) {
          destroy_effect(branch2.effect);
          __privateGet(this, _offscreen).delete(k);
        }
      }
    });
    this.anchor = anchor;
    __privateSet(this, _transition, transition);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(key2, fn) {
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var defer = should_defer_append();
    if (fn && !__privateGet(this, _onscreen).has(key2) && !__privateGet(this, _offscreen).has(key2)) {
      if (defer) {
        var fragment = document.createDocumentFragment();
        var target = create_text();
        fragment.append(target);
        __privateGet(this, _offscreen).set(key2, {
          effect: branch(() => fn(target)),
          fragment
        });
      } else {
        __privateGet(this, _onscreen).set(
          key2,
          branch(() => fn(this.anchor))
        );
      }
    }
    __privateGet(this, _batches).set(batch, key2);
    if (defer) {
      for (const [k, effect2] of __privateGet(this, _onscreen)) {
        if (k === key2) {
          batch.unskip_effect(effect2);
        } else {
          batch.skip_effect(effect2);
        }
      }
      for (const [k, branch2] of __privateGet(this, _offscreen)) {
        if (k === key2) {
          batch.unskip_effect(branch2.effect);
        } else {
          batch.skip_effect(branch2.effect);
        }
      }
      batch.oncommit(__privateGet(this, _commit));
      batch.ondiscard(__privateGet(this, _discard));
    } else {
      __privateGet(this, _commit).call(this, batch);
    }
  }
}
_batches = new WeakMap();
_onscreen = new WeakMap();
_offscreen = new WeakMap();
_outroing = new WeakMap();
_transition = new WeakMap();
_commit = new WeakMap();
_discard = new WeakMap();
function if_block(node, fn, elseif = false) {
  var branches = new BranchManager(node);
  var flags2 = elseif ? EFFECT_TRANSPARENT : 0;
  function update_branch(key2, fn2) {
    branches.ensure(key2, fn2);
  }
  block(() => {
    var has_branch = false;
    fn((fn2, key2 = 0) => {
      has_branch = true;
      update_branch(key2, fn2);
    });
    if (!has_branch) {
      update_branch(-1, null);
    }
  }, flags2);
}
const NAN = Symbol("NaN");
function key(node, get_key, render_fn2) {
  var branches = new BranchManager(node);
  var legacy = !is_runes();
  block(() => {
    var key2 = get_key();
    if (key2 !== key2) {
      key2 = /** @type {any} */
      NAN;
    }
    if (legacy && key2 !== null && typeof key2 === "object") {
      key2 = /** @type {V} */
      {};
    }
    branches.ensure(key2, render_fn2);
  });
}
function index(_, i) {
  return i;
}
function pause_effects(state2, to_destroy, controlled_anchor) {
  var transitions = [];
  var length = to_destroy.length;
  var group;
  var remaining = to_destroy.length;
  for (var i = 0; i < length; i++) {
    let effect2 = to_destroy[i];
    pause_effect(
      effect2,
      () => {
        if (group) {
          group.pending.delete(effect2);
          group.done.add(effect2);
          if (group.pending.size === 0) {
            var groups = (
              /** @type {Set<EachOutroGroup>} */
              state2.outrogroups
            );
            destroy_effects(state2, array_from(group.done));
            groups.delete(group);
            if (groups.size === 0) {
              state2.outrogroups = null;
            }
          }
        } else {
          remaining -= 1;
        }
      },
      false
    );
  }
  if (remaining === 0) {
    var fast_path = transitions.length === 0 && controlled_anchor !== null && state2.pending.size === 0;
    if (fast_path) {
      var anchor = (
        /** @type {Element} */
        controlled_anchor
      );
      var parent_node = (
        /** @type {Element} */
        anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(anchor);
      state2.items.clear();
    }
    destroy_effects(state2, to_destroy, !fast_path);
  } else {
    group = {
      pending: new Set(to_destroy),
      done: /* @__PURE__ */ new Set()
    };
    (state2.outrogroups ?? (state2.outrogroups = /* @__PURE__ */ new Set())).add(group);
  }
}
function destroy_effects(state2, to_destroy, remove_dom = true) {
  var preserved_effects;
  if (state2.pending.size > 0) {
    preserved_effects = /* @__PURE__ */ new Set();
    for (const keys of state2.pending.values()) {
      for (const key2 of keys) {
        preserved_effects.add(
          /** @type {EachItem} */
          state2.items.get(key2).e
        );
      }
    }
  }
  for (var i = 0; i < to_destroy.length; i++) {
    var e = to_destroy[i];
    if (preserved_effects == null ? void 0 : preserved_effects.has(e)) {
      e.f |= EFFECT_OFFSCREEN;
      const fragment = document.createDocumentFragment();
      move_effect(e, fragment);
    } else {
      destroy_effect(to_destroy[i], remove_dom);
    }
  }
}
var offscreen_anchor;
function each(node, flags2, get_collection, get_key, render_fn2, fallback_fn = null) {
  var anchor = node;
  var items = /* @__PURE__ */ new Map();
  var is_controlled = (flags2 & EACH_IS_CONTROLLED) !== 0;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      node
    );
    anchor = parent_node.appendChild(create_text());
  }
  var fallback = null;
  var each_array = /* @__PURE__ */ derived_safe_equal(() => {
    var collection = get_collection();
    return (
      /** @type {V[]} */
      is_array(collection) ? collection : collection == null ? [] : array_from(collection)
    );
  });
  var pending = /* @__PURE__ */ new Map();
  var first_run = true;
  function commit(batch) {
    if ((state2.effect.f & DESTROYED) !== 0) {
      return;
    }
    state2.pending.delete(batch);
    var array = get(each_array);
    state2.fallback = fallback;
    reconcile(state2, array, anchor, flags2, get_key);
    if (fallback !== null) {
      if (array.length === 0) {
        if ((fallback.f & EFFECT_OFFSCREEN) === 0) {
          resume_effect(fallback);
        } else {
          fallback.f ^= EFFECT_OFFSCREEN;
          move(fallback, null, anchor);
        }
      } else {
        pause_effect(fallback, () => {
          fallback = null;
        });
      }
    }
  }
  function discard(batch) {
    state2.pending.delete(batch);
  }
  var effect2 = block(() => {
    var array = (
      /** @type {V[]} */
      get(each_array)
    );
    var length = array.length;
    var keys = /* @__PURE__ */ new Set();
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var defer = should_defer_append();
    for (var index2 = 0; index2 < length; index2 += 1) {
      var value = array[index2];
      var key2 = get_key(value, index2);
      var item = first_run ? null : items.get(key2);
      if (item) {
        if (item.v) internal_set(item.v, value);
        if (item.i) internal_set(item.i, index2);
        if (defer) {
          batch.unskip_effect(item.e);
        }
      } else {
        item = create_item(
          items,
          first_run ? anchor : offscreen_anchor ?? (offscreen_anchor = create_text()),
          value,
          key2,
          index2,
          render_fn2,
          flags2,
          get_collection
        );
        if (!first_run) {
          item.e.f |= EFFECT_OFFSCREEN;
        }
        items.set(key2, item);
      }
      keys.add(key2);
    }
    if (length === 0 && fallback_fn && !fallback) {
      if (first_run) {
        fallback = branch(() => fallback_fn(anchor));
      } else {
        fallback = branch(() => fallback_fn(offscreen_anchor ?? (offscreen_anchor = create_text())));
        fallback.f |= EFFECT_OFFSCREEN;
      }
    }
    if (length > keys.size) {
      {
        each_key_duplicate();
      }
    }
    if (!first_run) {
      pending.set(batch, keys);
      if (defer) {
        for (const [key3, item2] of items) {
          if (!keys.has(key3)) {
            batch.skip_effect(item2.e);
          }
        }
        batch.oncommit(commit);
        batch.ondiscard(discard);
      } else {
        commit(batch);
      }
    }
    get(each_array);
  });
  var state2 = { effect: effect2, items, pending, outrogroups: null, fallback };
  first_run = false;
}
function skip_to_branch(effect2) {
  while (effect2 !== null && (effect2.f & BRANCH_EFFECT) === 0) {
    effect2 = effect2.next;
  }
  return effect2;
}
function reconcile(state2, array, anchor, flags2, get_key) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
  var is_animated = (flags2 & EACH_IS_ANIMATED) !== 0;
  var length = array.length;
  var items = state2.items;
  var current = skip_to_branch(state2.effect.first);
  var seen2;
  var prev = null;
  var to_animate;
  var matched = [];
  var stashed = [];
  var value;
  var key2;
  var effect2;
  var i;
  if (is_animated) {
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key2 = get_key(value, i);
      effect2 = /** @type {EachItem} */
      items.get(key2).e;
      if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
        (_b2 = (_a2 = effect2.nodes) == null ? void 0 : _a2.a) == null ? void 0 : _b2.measure();
        (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).add(effect2);
      }
    }
  }
  for (i = 0; i < length; i += 1) {
    value = array[i];
    key2 = get_key(value, i);
    effect2 = /** @type {EachItem} */
    items.get(key2).e;
    if (state2.outrogroups !== null) {
      for (const group of state2.outrogroups) {
        group.pending.delete(effect2);
        group.done.delete(effect2);
      }
    }
    if ((effect2.f & INERT) !== 0) {
      resume_effect(effect2);
      if (is_animated) {
        (_d = (_c = effect2.nodes) == null ? void 0 : _c.a) == null ? void 0 : _d.unfix();
        (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).delete(effect2);
      }
    }
    if ((effect2.f & EFFECT_OFFSCREEN) !== 0) {
      effect2.f ^= EFFECT_OFFSCREEN;
      if (effect2 === current) {
        move(effect2, null, anchor);
      } else {
        var next = prev ? prev.next : current;
        if (effect2 === state2.effect.last) {
          state2.effect.last = effect2.prev;
        }
        if (effect2.prev) effect2.prev.next = effect2.next;
        if (effect2.next) effect2.next.prev = effect2.prev;
        link(state2, prev, effect2);
        link(state2, effect2, next);
        move(effect2, next, anchor);
        prev = effect2;
        matched = [];
        stashed = [];
        current = skip_to_branch(prev.next);
        continue;
      }
    }
    if (effect2 !== current) {
      if (seen2 !== void 0 && seen2.has(effect2)) {
        if (matched.length < stashed.length) {
          var start = stashed[0];
          var j;
          prev = start.prev;
          var a = matched[0];
          var b = matched[matched.length - 1];
          for (j = 0; j < matched.length; j += 1) {
            move(matched[j], start, anchor);
          }
          for (j = 0; j < stashed.length; j += 1) {
            seen2.delete(stashed[j]);
          }
          link(state2, a.prev, b.next);
          link(state2, prev, a);
          link(state2, b, start);
          current = start;
          prev = b;
          i -= 1;
          matched = [];
          stashed = [];
        } else {
          seen2.delete(effect2);
          move(effect2, current, anchor);
          link(state2, effect2.prev, effect2.next);
          link(state2, effect2, prev === null ? state2.effect.first : prev.next);
          link(state2, prev, effect2);
          prev = effect2;
        }
        continue;
      }
      matched = [];
      stashed = [];
      while (current !== null && current !== effect2) {
        (seen2 ?? (seen2 = /* @__PURE__ */ new Set())).add(current);
        stashed.push(current);
        current = skip_to_branch(current.next);
      }
      if (current === null) {
        continue;
      }
    }
    if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
      matched.push(effect2);
    }
    prev = effect2;
    current = skip_to_branch(effect2.next);
  }
  if (state2.outrogroups !== null) {
    for (const group of state2.outrogroups) {
      if (group.pending.size === 0) {
        destroy_effects(state2, array_from(group.done));
        (_e = state2.outrogroups) == null ? void 0 : _e.delete(group);
      }
    }
    if (state2.outrogroups.size === 0) {
      state2.outrogroups = null;
    }
  }
  if (current !== null || seen2 !== void 0) {
    var to_destroy = [];
    if (seen2 !== void 0) {
      for (effect2 of seen2) {
        if ((effect2.f & INERT) === 0) {
          to_destroy.push(effect2);
        }
      }
    }
    while (current !== null) {
      if ((current.f & INERT) === 0 && current !== state2.fallback) {
        to_destroy.push(current);
      }
      current = skip_to_branch(current.next);
    }
    var destroy_length = to_destroy.length;
    if (destroy_length > 0) {
      var controlled_anchor = (flags2 & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
      if (is_animated) {
        for (i = 0; i < destroy_length; i += 1) {
          (_g = (_f = to_destroy[i].nodes) == null ? void 0 : _f.a) == null ? void 0 : _g.measure();
        }
        for (i = 0; i < destroy_length; i += 1) {
          (_i = (_h = to_destroy[i].nodes) == null ? void 0 : _h.a) == null ? void 0 : _i.fix();
        }
      }
      pause_effects(state2, to_destroy, controlled_anchor);
    }
  }
  if (is_animated) {
    queue_micro_task(() => {
      var _a3, _b3;
      if (to_animate === void 0) return;
      for (effect2 of to_animate) {
        (_b3 = (_a3 = effect2.nodes) == null ? void 0 : _a3.a) == null ? void 0 : _b3.apply();
      }
    });
  }
}
function create_item(items, anchor, value, key2, index2, render_fn2, flags2, get_collection) {
  var v = (flags2 & EACH_ITEM_REACTIVE) !== 0 ? (flags2 & EACH_ITEM_IMMUTABLE) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
  var i = (flags2 & EACH_INDEX_REACTIVE) !== 0 ? source(index2) : null;
  return {
    v,
    i,
    e: branch(() => {
      render_fn2(anchor, v ?? value, i ?? index2, get_collection);
      return () => {
        items.delete(key2);
      };
    })
  };
}
function move(effect2, next, anchor) {
  if (!effect2.nodes) return;
  var node = effect2.nodes.start;
  var end = effect2.nodes.end;
  var dest = next && (next.f & EFFECT_OFFSCREEN) === 0 ? (
    /** @type {EffectNodes} */
    next.nodes.start
  ) : anchor;
  while (node !== null) {
    var next_node = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node)
    );
    dest.before(node);
    if (node === end) {
      return;
    }
    node = next_node;
  }
}
function link(state2, prev, next) {
  if (prev === null) {
    state2.effect.first = next;
  } else {
    prev.next = next;
  }
  if (next === null) {
    state2.effect.last = prev;
  } else {
    next.prev = prev;
  }
}
function action(dom, action2, get_value) {
  effect(() => {
    var payload = untrack(() => action2(dom, get_value == null ? void 0 : get_value()) || {});
    if (get_value && (payload == null ? void 0 : payload.update)) {
      var inited = false;
      var prev = (
        /** @type {any} */
        {}
      );
      render_effect(() => {
        var value = get_value();
        deep_read_state(value);
        if (inited && safe_not_equal(prev, value)) {
          prev = value;
          payload.update(value);
        }
      });
      inited = true;
    }
    if (payload == null ? void 0 : payload.destroy) {
      return () => (
        /** @type {Function} */
        payload.destroy()
      );
    }
  });
}
const whitespace = [..." 	\n\r\f \v\uFEFF"];
function to_class(value, hash, directives) {
  var classname = value == null ? "" : "" + value;
  if (directives) {
    for (var key2 of Object.keys(directives)) {
      if (directives[key2]) {
        classname = classname ? classname + " " + key2 : key2;
      } else if (classname.length) {
        var len = key2.length;
        var a = 0;
        while ((a = classname.indexOf(key2, a)) >= 0) {
          var b = a + len;
          if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
            classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
          } else {
            a = b;
          }
        }
      }
    }
  }
  return classname === "" ? null : classname;
}
function to_style(value, styles) {
  return value == null ? null : String(value);
}
function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
  var prev = (
    /** @type {any} */
    dom[CLASS_CACHE]
  );
  if (prev !== value || prev === void 0) {
    var next_class_name = to_class(value, hash, next_classes);
    {
      if (next_class_name == null) {
        dom.removeAttribute("class");
      } else {
        dom.className = next_class_name;
      }
    }
    dom[CLASS_CACHE] = value;
  } else if (next_classes && prev_classes !== next_classes) {
    for (var key2 in next_classes) {
      var is_present = !!next_classes[key2];
      if (prev_classes == null || is_present !== !!prev_classes[key2]) {
        dom.classList.toggle(key2, is_present);
      }
    }
  }
  return next_classes;
}
function set_style(dom, value, prev_styles, next_styles) {
  var prev = (
    /** @type {any} */
    dom[STYLE_CACHE]
  );
  if (prev !== value) {
    var next_style_attr = to_style(value);
    {
      if (next_style_attr == null) {
        dom.removeAttribute("style");
      } else {
        dom.style.cssText = next_style_attr;
      }
    }
    dom[STYLE_CACHE] = value;
  }
  return next_styles;
}
const IS_CUSTOM_ELEMENT = Symbol("is custom element");
const IS_HTML = Symbol("is html");
function set_attribute(element, attribute, value, skip_warning) {
  var attributes = get_attributes(element);
  var previous = attributes[attribute];
  if (previous === (attributes[attribute] = value)) return;
  if (attribute === "loading") {
    element[LOADING_ATTR_SYMBOL] = value;
  }
  if (value == null) {
    element.removeAttribute(attribute);
  } else if (typeof value !== "string" && get_setters(element).has(attribute)) {
    element[attribute] = value;
  } else {
    element.setAttribute(attribute, value);
  }
}
function get_attributes(element) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    element[ATTRIBUTES_CACHE] ?? (element[ATTRIBUTES_CACHE] = {
      [IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
      [IS_HTML]: element.namespaceURI === NAMESPACE_HTML
    })
  );
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(element) {
  var cache_key = element.getAttribute("is") || element.nodeName;
  var setters = setters_cache.get(cache_key);
  if (setters) return setters;
  setters_cache.set(cache_key, setters = /* @__PURE__ */ new Set());
  var descriptors;
  var proto = element;
  var element_proto = Element.prototype;
  while (element_proto !== proto) {
    descriptors = get_descriptors(proto);
    for (var key2 in descriptors) {
      if (descriptors[key2].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      key2 !== "innerHTML" && key2 !== "textContent" && key2 !== "innerText") {
        setters.add(key2);
      }
    }
    proto = get_prototype_of(proto);
  }
  return setters;
}
function is_bound_this(bound_value, element_or_component) {
  return bound_value === element_or_component || (bound_value == null ? void 0 : bound_value[STATE_SYMBOL]) === element_or_component;
}
function bind_this(element_or_component = mark_as_component(), update, get_value, get_parts) {
  var component_effect = (
    /** @type {ComponentContext} */
    component_context.r
  );
  var parent = (
    /** @type {Effect} */
    active_effect
  );
  effect(() => {
    var old_parts;
    var parts;
    render_effect(() => {
      old_parts = parts;
      parts = [];
      untrack(() => {
        if (!is_bound_this(get_value(...parts), element_or_component)) {
          update(element_or_component, ...parts);
          if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
            update(null, ...old_parts);
          }
        }
      });
    });
    return () => {
      let p = parent;
      while (p !== component_effect && p.parent !== null && p.parent.f & DESTROYING) {
        p = p.parent;
      }
      const teardown2 = () => {
        if (parts && is_bound_this(get_value(...parts), element_or_component)) {
          update(null, ...parts);
        }
      };
      const original_teardown = p.teardown;
      p.teardown = () => {
        teardown2();
        original_teardown == null ? void 0 : original_teardown();
      };
    };
  });
  return element_or_component;
}
function init(immutable = false) {
  const context = (
    /** @type {ComponentContextLegacy} */
    component_context
  );
  const callbacks = context.l.u;
  if (!callbacks) return;
  let props = () => deep_read_state(context.s);
  if (immutable) {
    let version = 0;
    let prev = (
      /** @type {Record<string, any>} */
      {}
    );
    const d = /* @__PURE__ */ derived(() => {
      let changed = false;
      const props2 = context.s;
      for (const key2 in props2) {
        if (props2[key2] !== prev[key2]) {
          prev[key2] = props2[key2];
          changed = true;
        }
      }
      if (changed) version++;
      return version;
    });
    props = () => get(d);
  }
  if (callbacks.b.length) {
    user_pre_effect(() => {
      observe_all(context, props);
      run_all(callbacks.b);
    });
  }
  user_effect(() => {
    const fns = untrack(() => callbacks.m.map(run));
    return () => {
      for (const fn of fns) {
        if (typeof fn === "function") {
          fn();
        }
      }
    };
  });
  if (callbacks.a.length) {
    user_effect(() => {
      observe_all(context, props);
      run_all(callbacks.a);
    });
  }
}
function observe_all(context, props) {
  if (context.l.s) {
    for (const signal of context.l.s) get(signal);
  }
  props();
}
let is_store_binding = false;
function capture_store_binding(fn) {
  var previous_is_store_binding = is_store_binding;
  try {
    is_store_binding = false;
    return [fn(), is_store_binding];
  } finally {
    is_store_binding = previous_is_store_binding;
  }
}
const spread_props_handler = {
  get(target, key2) {
    let i = target.props.length;
    while (i--) {
      let p = target.props[i];
      if (is_function(p)) p = p();
      if (typeof p === "object" && p !== null && key2 in p) return p[key2];
    }
  },
  set(target, key2, value) {
    let i = target.props.length;
    while (i--) {
      let p = target.props[i];
      if (is_function(p)) p = p();
      const desc = get_descriptor(p, key2);
      if (desc && desc.set) {
        desc.set(value);
        return true;
      }
    }
    return false;
  },
  getOwnPropertyDescriptor(target, key2) {
    let i = target.props.length;
    while (i--) {
      let p = target.props[i];
      if (is_function(p)) p = p();
      if (typeof p === "object" && p !== null && key2 in p) {
        const descriptor = get_descriptor(p, key2);
        if (descriptor && !descriptor.configurable) {
          descriptor.configurable = true;
        }
        return descriptor;
      }
    }
  },
  has(target, key2) {
    if (key2 === STATE_SYMBOL || key2 === LEGACY_PROPS) return false;
    for (let p of target.props) {
      if (is_function(p)) p = p();
      if (p != null && key2 in p) return true;
    }
    return false;
  },
  ownKeys(target) {
    const keys = [];
    for (let p of target.props) {
      if (is_function(p)) p = p();
      if (!p) continue;
      for (const key2 in p) {
        if (!keys.includes(key2)) keys.push(key2);
      }
      for (const key2 of Object.getOwnPropertySymbols(p)) {
        if (!keys.includes(key2)) keys.push(key2);
      }
    }
    return keys;
  }
};
function spread_props(...props) {
  return new Proxy({ props }, spread_props_handler);
}
function prop(props, key2, flags2, fallback) {
  var _a2;
  var runes = !legacy_mode_flag || (flags2 & PROPS_IS_RUNES) !== 0;
  var bindable = (flags2 & PROPS_IS_BINDABLE) !== 0;
  var lazy = (flags2 & PROPS_IS_LAZY_INITIAL) !== 0;
  var fallback_value = (
    /** @type {V} */
    fallback
  );
  var fallback_dirty = true;
  var fallback_signal = (
    /** @type {Derived<V> | undefined} */
    void 0
  );
  var get_fallback = () => {
    if (lazy && runes) {
      fallback_signal ?? (fallback_signal = /* @__PURE__ */ derived(
        /** @type {() => V} */
        fallback
      ));
      return get(fallback_signal);
    }
    if (fallback_dirty) {
      fallback_dirty = false;
      fallback_value = lazy ? untrack(
        /** @type {() => V} */
        fallback
      ) : (
        /** @type {V} */
        fallback
      );
    }
    return fallback_value;
  };
  let setter;
  if (bindable) {
    var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
    setter = ((_a2 = get_descriptor(props, key2)) == null ? void 0 : _a2.set) ?? (is_entry_props && key2 in props ? (v) => props[key2] = v : void 0);
  }
  var initial_value;
  var is_store_sub = false;
  if (bindable) {
    [initial_value, is_store_sub] = capture_store_binding(() => (
      /** @type {V} */
      props[key2]
    ));
  } else {
    initial_value = /** @type {V} */
    props[key2];
  }
  if (initial_value === void 0 && fallback !== void 0) {
    initial_value = get_fallback();
    if (setter) {
      if (runes) props_invalid_value();
      setter(initial_value);
    }
  }
  var getter;
  if (runes) {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key2]
      );
      if (value === void 0) return get_fallback();
      fallback_dirty = true;
      return value;
    };
  } else {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key2]
      );
      if (value !== void 0) {
        fallback_value = /** @type {V} */
        void 0;
      }
      return value === void 0 ? fallback_value : value;
    };
  }
  if (runes && (flags2 & PROPS_IS_UPDATED) === 0) {
    return getter;
  }
  if (setter) {
    var legacy_parent = props.$$legacy;
    return (
      /** @type {() => V} */
      (function(value, mutation) {
        if (arguments.length > 0) {
          if (!runes || !mutation || legacy_parent || is_store_sub) {
            setter(mutation ? getter() : value);
          }
          return value;
        }
        return getter();
      })
    );
  }
  var overridden = false;
  var d = ((flags2 & PROPS_IS_IMMUTABLE) !== 0 ? derived : derived_safe_equal)(() => {
    overridden = false;
    return getter();
  });
  if (bindable) get(d);
  var parent_effect = (
    /** @type {Effect} */
    active_effect
  );
  return (
    /** @type {() => V} */
    (function(value, mutation) {
      if (arguments.length > 0) {
        const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;
        set(d, new_value);
        overridden = true;
        if (fallback_value !== void 0) {
          fallback_value = new_value;
        }
        return value;
      }
      if (is_destroying_effect && overridden || (parent_effect.f & DESTROYED) !== 0) {
        return d.v;
      }
      return get(d);
    })
  );
}
function onMount(fn) {
  if (component_context === null) {
    lifecycle_outside_component();
  }
  if (legacy_mode_flag && component_context.l !== null) {
    init_update_callbacks(component_context).m.push(fn);
  } else {
    user_effect(() => {
      const cleanup = untrack(fn);
      if (typeof cleanup === "function") return (
        /** @type {() => void} */
        cleanup
      );
    });
  }
}
function init_update_callbacks(context) {
  var l = (
    /** @type {ComponentContextLegacy} */
    context.l
  );
  return l.u ?? (l.u = { a: [], b: [], m: [] });
}
const PUBLIC_VERSION = "5";
if (typeof window !== "undefined") {
  ((_b = window.__svelte ?? (window.__svelte = {})).v ?? (_b.v = /* @__PURE__ */ new Set())).add(PUBLIC_VERSION);
}
const __vite_glob_0_0 = "" + new URL("01-2026-11-02-LUCKY_CATCH-Y3GFk1x4.jpg", import.meta.url).href;
const __vite_glob_0_1 = "" + new URL("02-2026-11-02-CHAMPIGNION_A_CHAIRE_SAINE_AS_FOCK-eSSvs4TX.jpg", import.meta.url).href;
const __vite_glob_0_2 = "" + new URL("03-2026-11-02-HALLOWEEN_APOCALYPSE_Part1-B8pqTNgO.jpg", import.meta.url).href;
const __vite_glob_0_3 = "" + new URL("04-2026-11-01-La_vie_est_elle_si_on_se_donne_la_peine-CepUQhUC.jpg", import.meta.url).href;
const __vite_glob_0_4 = "" + new URL("05-2026-11-01-HALLOWEEN_APOCALYPSE_Part2-B5m2d76x.jpg", import.meta.url).href;
const __vite_glob_0_5 = "" + new URL("06-2026-10-12-SEXY_AND_ALIVE-Df2iBiXf.jpg", import.meta.url).href;
const __vite_glob_0_6 = "" + new URL("07-2026-10-12-Viper-Stylo-Fourchette-D1EcbZUU.jpg", import.meta.url).href;
const __vite_glob_0_7 = "" + new URL("08-2026-10-12-bouncing_girl-CmF4mjJa.jpg", import.meta.url).href;
const __vite_glob_0_8 = "" + new URL("09-2026-10-11-SEXY_AND_ALIVE_2-y3bctit8.jpg", import.meta.url).href;
const __vite_glob_0_9 = "" + new URL("10-2026-10-11-Viper-Stylo-Fourchette_2-CxGfy4O4.jpg", import.meta.url).href;
const __vite_glob_0_10 = "" + new URL("11-2026-10-11-bouncing_girl_2-Bpw7iS91.jpg", import.meta.url).href;
const __vite_glob_0_11 = "" + new URL("12-2026-10-11-Farmer_luring_zombie-CCTGSnPY.jpg", import.meta.url).href;
const __vite_glob_0_12 = "" + new URL("13-2026-09-27-backflip_Godzilla-K9Ngaf4w.jpg", import.meta.url).href;
const __vite_glob_0_13 = "" + new URL("14-2026-09-21-SPICY_CHALLENGE_en_foret-DlT7mXah.jpg", import.meta.url).href;
const __vite_glob_0_14 = "" + new URL("15-2026-09-19-SPICY_CHALLENGE_en_foret_2-B5R9aOW_.jpg", import.meta.url).href;
const __vite_glob_0_15 = "" + new URL("16-fire_shit-DzkKnTSs.jpg", import.meta.url).href;
const __vite_glob_0_16 = "" + new URL("17-survival_roleplay-CfZuxVpM.jpg", import.meta.url).href;
const __vite_glob_0_17 = "" + new URL("18-Inside_CAN_I_BEAT_THE_GAME_WHIT_JUMP_TO_MOVE-IN66S89v.jpg", import.meta.url).href;
const __vite_glob_0_18 = "" + new URL("19-GRAFFITI_AND_APOCALYPSE_ROLEPLAY-CEh1DNI2.jpg", import.meta.url).href;
const __vite_glob_0_19 = "" + new URL("20-Dead_island_Pistole_challenge-BidoCwT_.jpg", import.meta.url).href;
const __vite_glob_0_20 = "" + new URL("athena-rojo-D2b29QyD.jpg", import.meta.url).href;
const __vite_glob_0_21 = "" + new URL("logo-OmKo2-I2.jpg", import.meta.url).href;
const __vite_glob_0_22 = "" + new URL("selfie-auriculares-D3IOa5i5.jpg", import.meta.url).href;
const logoUrl = "" + new URL("logo-OmKo2-I2.jpg", import.meta.url).href;
const selfieUrl = "" + new URL("selfie-auriculares-D3IOa5i5.jpg", import.meta.url).href;
const urls = /* @__PURE__ */ Object.assign({
  "../../media/01-2026-11-02-LUCKY_CATCH.jpg": __vite_glob_0_0,
  "../../media/02-2026-11-02-CHAMPIGNION_A_CHAIRE_SAINE_AS_FOCK.jpg": __vite_glob_0_1,
  "../../media/03-2026-11-02-HALLOWEEN_APOCALYPSE_Part1.jpg": __vite_glob_0_2,
  "../../media/04-2026-11-01-La_vie_est_elle_si_on_se_donne_la_peine.jpg": __vite_glob_0_3,
  "../../media/05-2026-11-01-HALLOWEEN_APOCALYPSE_Part2.jpg": __vite_glob_0_4,
  "../../media/06-2026-10-12-SEXY_AND_ALIVE.jpg": __vite_glob_0_5,
  "../../media/07-2026-10-12-Viper-Stylo-Fourchette.jpg": __vite_glob_0_6,
  "../../media/08-2026-10-12-bouncing_girl.jpg": __vite_glob_0_7,
  "../../media/09-2026-10-11-SEXY_AND_ALIVE_2.jpg": __vite_glob_0_8,
  "../../media/10-2026-10-11-Viper-Stylo-Fourchette_2.jpg": __vite_glob_0_9,
  "../../media/11-2026-10-11-bouncing_girl_2.jpg": __vite_glob_0_10,
  "../../media/12-2026-10-11-Farmer_luring_zombie.jpg": __vite_glob_0_11,
  "../../media/13-2026-09-27-backflip_Godzilla.jpg": __vite_glob_0_12,
  "../../media/14-2026-09-21-SPICY_CHALLENGE_en_foret.jpg": __vite_glob_0_13,
  "../../media/15-2026-09-19-SPICY_CHALLENGE_en_foret_2.jpg": __vite_glob_0_14,
  "../../media/16-fire_shit.jpg": __vite_glob_0_15,
  "../../media/17-survival_roleplay.jpg": __vite_glob_0_16,
  "../../media/18-Inside_CAN_I_BEAT_THE_GAME_WHIT_JUMP_TO_MOVE.jpg": __vite_glob_0_17,
  "../../media/19-GRAFFITI_AND_APOCALYPSE_ROLEPLAY.jpg": __vite_glob_0_18,
  "../../media/20-Dead_island_Pistole_challenge.jpg": __vite_glob_0_19,
  "../../media/athena-rojo.jpg": __vite_glob_0_20,
  "../../media/logo.jpg": __vite_glob_0_21,
  "../../media/selfie-auriculares.jpg": __vite_glob_0_22
});
const logo = logoUrl;
const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric"
});
const PROPER_NOUNS = {
  godzilla: "Godzilla",
  viper: "Viper",
  stylo: "Stylo",
  foret: "Forêt",
  fourchette: "Fourchette",
  champignion: "Champignon",
  dead: "Dead",
  island: "Island"
};
function formatTitle(raw) {
  const text = raw.replace(/_/g, " ").replace(/-/g, " ").replace(/\s+/g, " ").trim().toLowerCase().replace(/(part)\s*(\d)/g, "$1 $2");
  const withNouns = text.split(" ").map((word) => PROPER_NOUNS[word] ?? word).join(" ");
  return withNouns.charAt(0).toUpperCase() + withNouns.slice(1);
}
function toClip([path, src]) {
  const base = path.split("/").pop().replace(/\.jpg$/i, "");
  const match = base.match(/^(\d+)-(?:(\d{4})-(\d{2})-(\d{2})-)?(.+)$/);
  if (!match) return null;
  const [, index2, year, month, day, rawTitle] = match;
  const title = formatTitle(rawTitle);
  const date = year ? new Date(Number(year), Number(month) - 1, Number(day)) : null;
  const dateLabel = date ? dateFormatter.format(date) : "Directo";
  return {
    id: base,
    n: Number(index2),
    date,
    dateLabel,
    title,
    src,
    alt: date ? `Captura del directo «${title}» del ${dateLabel}` : `Captura del directo «${title}»`,
    href: "https://www.twitch.tv/plottyplote666/videos"
  };
}
const clips = Object.entries(urls).map(toClip).filter(Boolean).sort((a, b) => a.n - b.n);
const extraPhotos = {
  selfie: { id: "selfie-auriculares", date: null, title: "Selfie", src: selfieUrl }
};
function clipByNumber(n) {
  return clips.find((clip) => clip.n === n) ?? clips[0];
}
const translations = {
  es: {
    code: "es",
    htmlLang: "es",
    dateLocale: "es-ES",
    name: "Español",
    meta: {
      title: "plottyplote666 — directos en Twitch",
      description: "plottyplote666, directos en Twitch: partidas largas, chat y comunidad.",
      ogTitle: "plottyplote666 — directos en Twitch",
      ogDescription: "Partidas, charla y buena compañía, varias noches por semana."
    },
    nav: {
      gallery: "Galería",
      youtube: "YouTube",
      twitch: "Ver en Twitch",
      menu: "Menú",
      langAria: "Seleccionar idioma",
      menuAria: "Abrir el menú de navegación",
      mainAria: "Navegación principal"
    },
    hero: {
      title: "plottyplote666",
      sub: "Partidas largas, chat y buena compañía.",
      cta: "Ver el directo",
      alt: "Portada del canal plottyplote666"
    },
    canal: {
      title: "Un canal para quedarse un rato",
      lead: "Dos noches por semana el directo se alarga hasta que el chat aguante. El juego es la excusa; lo demás es compañía.",
      watchLatest: "▶ Ver el último directo",
      features: [
        {
          icon: "mic",
          title: "Directos sin prisa",
          text: "Sesiones que empiezan de noche y siguen mientras haya conversación."
        },
        {
          icon: "chat",
          title: "El chat manda",
          text: "Las decisiones se comentan en directo: si el chat propone, se prueba."
        },
        {
          icon: "users",
          title: "Comunidad pequeña",
          text: "Gente que se reconoce por el nombre y vuelve cada semana al mismo sitio."
        }
      ]
    },
    gallery: {
      eyebrow: "Galería",
      title: "Los últimos directos",
      lead: "Capturas de las noches del canal, de la más reciente a la primera. Elige cualquiera para verla en grande.",
      more: "…¡y más!",
      action: "Ver todos los vídeos en Twitch",
      aria: "Galería de directos",
      closeAria: "Cerrar la galería",
      prevAria: "Captura anterior",
      nextAria: "Captura siguiente",
      cardAria: (title) => `Abrir «${title}» en grande`,
      twitchLink: "Ver los directos en Twitch",
      defaultDateLabel: "Directo",
      filterAll: "Todas",
      filterArchive: "Archivo",
      filterAria: "Filtrar capturas por fecha",
      featuredBadge: "Último directo",
      viewFull: "Ver en grande",
      showMore: (n) => `Ver todas las capturas (+${n})`,
      showLess: "Mostrar menos",
      empty: "No hay capturas en este periodo.",
      fitView: "Encajar",
      fillView: "Llenar",
      fitToggleAria: "Alternar entre vista completa y encuadre relleno",
      thumbnailsAria: "Miniaturas de la galería",
      thumbAria: (title, n) => `Ir a la captura ${n}: «${title}»`,
      clipAlt: (title, date) => date ? `Captura del directo «${title}» del ${date}` : `Captura del directo «${title}»`
    },
    comunidad: {
      eyebrow: "Comunidad",
      title: "Lo que pasa en el directo",
      lead: "Cada semana el mismo ritual: se abre el juego, se lee el chat y se decide entre todos por dónde seguir.",
      carouselAria: "Momentos de comunidad"
    },
    juegos: {
      eyebrow: "Qué se juega",
      title: "Rol, retos y clásicos raros",
      lead: "De partidas largas de rol a retos improvisados con el chat: elige una categoría para ver momentos de cada noche.",
      categoryGroupAria: "Categorías de juego",
      watchClips: "Ver los clips",
      features: [
        {
          icon: "leaf",
          title: "Supervivencia y rol",
          text: "Partidas de rol y supervivencia donde la historia la escriben los que están mirando."
        },
        {
          icon: "spark",
          title: "Retos con el chat",
          text: "Desafíos sobre la marcha: comer picante en el bosque o pistolas en la isla de los muertos."
        },
        {
          icon: "gamepad",
          title: "Clásicos y rarezas",
          text: "De peleas de Godzilla de los noventa a juegos que nadie recuerda."
        },
        {
          icon: "moon",
          title: "Partidas que se alargan",
          text: "Halloween en dos partes, maratones que acaban de madrugada."
        }
      ]
    },
    compania: {
      eyebrow: "Compañía",
      title: "El chat es la mitad del directo",
      lead: "Sin moderadores severos ni reglas raras: llegar, saludar y quedarse el rato que apetezca.",
      carouselAria: "Momentos de charla",
      bubbleLeft: "¿otra partida más?",
      bubbleRight: "quedan dos, lo prometo",
      chatCta: "Pasarte por el chat",
      chatExchanges: [
        { left: "¿otra partida más?", right: "quedan dos, lo prometo" },
        { left: "¿eso de verdad funciona?", right: "mira cómo sale volando" },
        { left: "ni de broma llegas arriba", right: "sujétame el café" },
        { left: "¿hasta qué hora hoy?", right: "hasta que el chat aguante" }
      ],
      features: [
        {
          icon: "heart",
          title: "Cercano",
          text: "Se lee el chat por el nombre y se responde a lo que se pregunta."
        },
        {
          icon: "calendar",
          title: "Constante",
          text: "El canal se actualiza semana a semana, con las capturas de cada directo."
        },
        {
          icon: "spark",
          title: "Sin guion",
          text: "Lo que pasa en el directo depende del día y de quién esté mirando."
        }
      ]
    },
    vision: {
      eyebrow: "Hacia dónde va",
      lead: "La idea es sencilla: que el canal crezca al ritmo de la gente que ya está dentro. Más noches, más juegos, el mismo tono tranquilo de siempre."
    },
    cierre: {
      eyebrow: "Horario y canales",
      sub: "Nos vemos en el directo.",
      youtube: "Ver en YouTube",
      twitch: "Ver en Twitch",
      note: "twitch.tv/plottyplote666 · Cuando el chat aguante",
      livePill: "Directos nocturnos · Abrir canal",
      schedule: [
        { icon: "calendar", text: "Dos noches por semana" },
        { icon: "moon", text: "Madrugadas sin prisa" },
        { icon: "chat", text: "Chat abierto" }
      ],
      portraitAlt: "Retrato de plottyplote666"
    },
    carousel: {
      prev: "Foto anterior",
      next: "Foto siguiente",
      tablist: "Seleccionar foto",
      dot: (index2, total) => `Foto ${index2 + 1} de ${total}`
    },
    music: {
      hint: "Haz clic en cualquier parte para activar el sonido",
      label: "Música",
      muteAria: "Silenciar la música de fondo",
      playAria: "Activar la música de fondo"
    },
    footer: {
      groups: [
        [
          { label: "El canal", href: "#canal" },
          { label: "Galería", href: "#galeria" }
        ],
        [
          { label: "Twitch", href: "https://www.twitch.tv/plottyplote666" },
          { label: "YouTube", href: "https://www.youtube.com/@plottyplotesiro4549" },
          { label: "Vídeos", href: "https://www.youtube.com/@plottyplotesiro4549/videos" },
          { label: "Clips", href: "https://www.twitch.tv/plottyplote666/clips" }
        ],
        [
          { label: "Directos en YouTube", href: "https://www.youtube.com/@plottyplotesiro4549/streams" },
          { label: "Chat del canal", href: "https://www.twitch.tv/plottyplote666/chat" },
          { label: "Sobre el canal", href: "https://www.twitch.tv/plottyplote666/about" }
        ]
      ],
      copy: "© {year} plottyplote666",
      credits: "Página creada por Veltrix",
      langLabel: "Idioma"
    }
  },
  en: {
    code: "en",
    htmlLang: "en",
    dateLocale: "en-US",
    name: "English",
    meta: {
      title: "plottyplote666 — Twitch live streams",
      description: "plottyplote666, Twitch live streams: long gaming sessions, chat and community.",
      ogTitle: "plottyplote666 — Twitch live streams",
      ogDescription: "Gaming sessions, chat and great company, several nights a week."
    },
    nav: {
      gallery: "Gallery",
      youtube: "YouTube",
      twitch: "Watch on Twitch",
      menu: "Menu",
      langAria: "Select language",
      menuAria: "Open navigation menu",
      mainAria: "Main navigation"
    },
    hero: {
      title: "plottyplote666",
      sub: "Long gaming sessions, chat and great company.",
      cta: "Watch stream",
      alt: "Cover image of plottyplote666 channel"
    },
    canal: {
      title: "A channel to hang out for a while",
      lead: "Two nights a week the stream runs as long as the chat stays up. The game is just an excuse; the rest is company.",
      watchLatest: "▶ Watch latest stream",
      features: [
        {
          icon: "mic",
          title: "Unrushed streams",
          text: "Sessions that kick off at night and keep going as long as the conversation flows."
        },
        {
          icon: "chat",
          title: "Chat calls the shots",
          text: "Decisions are weighed live: if chat brings an idea to the table, we try it."
        },
        {
          icon: "users",
          title: "Close-knit community",
          text: "Familiar faces who know each other by name and come back each week."
        }
      ]
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Recent streams",
      lead: "Screenshots from the channel's stream nights, from the latest to the very first. Pick any to view it full size.",
      more: "…and more!",
      action: "Watch all videos on Twitch",
      aria: "Stream gallery",
      closeAria: "Close gallery",
      prevAria: "Previous capture",
      nextAria: "Next capture",
      cardAria: (title) => `View "${title}" full size`,
      twitchLink: "Watch streams on Twitch",
      defaultDateLabel: "Live stream",
      filterAll: "All",
      filterArchive: "Archive",
      filterAria: "Filter captures by date",
      featuredBadge: "Latest stream",
      viewFull: "View full size",
      showMore: (n) => `Show all captures (+${n})`,
      showLess: "Show fewer",
      empty: "No captures in this period.",
      fitView: "Fit",
      fillView: "Fill",
      fitToggleAria: "Toggle between full-frame fit and cropped fill",
      thumbnailsAria: "Gallery thumbnails",
      thumbAria: (title, n) => `Jump to capture ${n}: "${title}"`,
      clipAlt: (title, date) => date ? `Screenshot from stream "${title}" on ${date}` : `Screenshot from stream "${title}"`
    },
    comunidad: {
      eyebrow: "Community",
      title: "What happens on stream",
      lead: "The same ritual every week: fire up the game, read the chat, and decide together where to head next.",
      carouselAria: "Community highlights"
    },
    juegos: {
      eyebrow: "What we play",
      title: "Roleplay, challenges, and rare classics",
      lead: "From slow-burn roleplay to spontaneous dares with chat — pick a category to preview highlights from each night.",
      categoryGroupAria: "Game categories",
      watchClips: "Watch clips",
      features: [
        {
          icon: "leaf",
          title: "Survival and roleplay",
          text: "Survival and RP games where the story is written by those watching."
        },
        {
          icon: "spark",
          title: "Challenges with chat",
          text: "Spur-of-the-moment dares: spicy food in the woods or pistols-only on Dead Island."
        },
        {
          icon: "gamepad",
          title: "Classics and oddities",
          text: "From nineties Godzilla brawls to obscure gems nobody remembers."
        },
        {
          icon: "moon",
          title: "Late-night sessions",
          text: "Two-part Halloween specials, marathons running well into the early morning."
        }
      ]
    },
    compania: {
      eyebrow: "Company",
      title: "The chat is half the stream",
      lead: "No strict mods or weird rules: drop in, say hello, and hang out as long as you feel like.",
      carouselAria: "Chatting moments",
      bubbleLeft: "one more match?",
      bubbleRight: "two left, promise",
      chatCta: "Drop into Twitch chat",
      chatExchanges: [
        { left: "one more match?", right: "two left, promise" },
        { left: "does that actually work?", right: "watch it launch" },
        { left: "no way you make that jump", right: "hold my coffee" },
        { left: "how late tonight?", right: "as long as chat stays up" }
      ],
      features: [
        {
          icon: "heart",
          title: "Welcoming",
          text: "People are greeted by name and every question gets answered."
        },
        {
          icon: "calendar",
          title: "Consistent",
          text: "The channel updates week after week, with highlights from every broadcast."
        },
        {
          icon: "spark",
          title: "Unscripted",
          text: "What happens on stream depends on the day and who is hanging around."
        }
      ]
    },
    vision: {
      eyebrow: "Looking forward",
      lead: "The idea is simple: let the channel grow at the pace of the people already here. More nights, more games, the same relaxed vibe as always."
    },
    cierre: {
      eyebrow: "Schedule & channels",
      sub: "See you on stream.",
      youtube: "Watch on YouTube",
      twitch: "Watch on Twitch",
      note: "twitch.tv/plottyplote666 · Whenever chat is up",
      livePill: "Late-night streams · Open channel",
      schedule: [
        { icon: "calendar", text: "Two nights a week" },
        { icon: "moon", text: "Late-night sessions" },
        { icon: "chat", text: "Open chat" }
      ],
      portraitAlt: "Portrait of plottyplote666"
    },
    carousel: {
      prev: "Previous photo",
      next: "Next photo",
      tablist: "Select photo",
      dot: (index2, total) => `Photo ${index2 + 1} of ${total}`
    },
    music: {
      hint: "Click anywhere to enable background audio",
      label: "Music",
      muteAria: "Mute background music",
      playAria: "Play background music"
    },
    footer: {
      groups: [
        [
          { label: "The Channel", href: "#canal" },
          { label: "Gallery", href: "#galeria" }
        ],
        [
          { label: "Twitch", href: "https://www.twitch.tv/plottyplote666" },
          { label: "YouTube", href: "https://www.youtube.com/@plottyplotesiro4549" },
          { label: "Videos", href: "https://www.youtube.com/@plottyplotesiro4549/videos" },
          { label: "Clips", href: "https://www.twitch.tv/plottyplote666/clips" }
        ],
        [
          { label: "YouTube Streams", href: "https://www.youtube.com/@plottyplotesiro4549/streams" },
          { label: "Channel Chat", href: "https://www.twitch.tv/plottyplote666/chat" },
          { label: "About the Channel", href: "https://www.twitch.tv/plottyplote666/about" }
        ]
      ],
      copy: "© {year} plottyplote666",
      credits: "Website created by Veltrix",
      langLabel: "Language"
    }
  },
  fr: {
    code: "fr",
    htmlLang: "fr-CA",
    dateLocale: "fr-CA",
    name: "Français (Québec)",
    meta: {
      title: "plottyplote666 — diffusions en direct sur Twitch",
      description: "plottyplote666, diffusions en direct sur Twitch : longues sessions de jeu, clavardage et bonne gang.",
      ogTitle: "plottyplote666 — diffusions en direct sur Twitch",
      ogDescription: "Sessions de jeu, jasette et bonne compagnie, plusieurs soirs par semaine."
    },
    nav: {
      gallery: "Galerie",
      youtube: "YouTube",
      twitch: "Voir sur Twitch",
      menu: "Menu",
      langAria: "Changer de langue",
      menuAria: "Ouvrir le menu de navigation",
      mainAria: "Navigation principale"
    },
    hero: {
      title: "plottyplote666",
      sub: "De longues sessions de jeu, de la jasette et une maudite belle gang.",
      cta: "Voir le direct",
      alt: "Image de couverture de la chaîne plottyplote666"
    },
    canal: {
      title: "Une chaîne pour s’arrêter et relaxer",
      lead: "Deux soirs par semaine, le direct s’étire tant que le monde a de l’énergie. Le jeu est un prétexte; le reste, c’est de la belle compagnie.",
      watchLatest: "▶ Visionner le dernier direct",
      features: [
        {
          icon: "mic",
          title: "Des directs sans presse",
          text: "Des sessions qui partent en soirée et s’étirent tant qu’on a du fun à jaser."
        },
        {
          icon: "chat",
          title: "Le clavardage décide",
          text: "Les décisions se prennent en direct : si le chat propose une idée, on l’essaie."
        },
        {
          icon: "users",
          title: "Une petite gang serrée",
          text: "Du monde qui se reconnaît par son nom et revient chaque semaine au même rendez-vous."
        }
      ]
    },
    gallery: {
      eyebrow: "Galerie",
      title: "Les plus récents directs",
      lead: "Des captures des soirées de stream, de la plus récente à la toute première. Clique sur une image pour l’agrandir.",
      more: "…et encore plus!",
      action: "Voir toutes les vidéos sur Twitch",
      aria: "Galerie des directs",
      closeAria: "Fermer la galerie",
      prevAria: "Capture précédente",
      nextAria: "Capture suivante",
      cardAria: (title) => `Agrandir « ${title} »`,
      twitchLink: "Voir les diffusions sur Twitch",
      defaultDateLabel: "En direct",
      filterAll: "Toutes",
      filterArchive: "Archives",
      filterAria: "Filtrer les captures par date",
      featuredBadge: "Dernier direct",
      viewFull: "Agrandir",
      showMore: (n) => `Voir toutes les captures (+${n})`,
      showLess: "Afficher moins",
      empty: "Aucune capture pour cette période.",
      fitView: "Ajuster",
      fillView: "Remplir",
      fitToggleAria: "Basculer entre vue complète et remplissage",
      thumbnailsAria: "Vignettes de la galerie",
      thumbAria: (title, n) => `Aller à la capture ${n} : « ${title} »`,
      clipAlt: (title, date) => date ? `Capture du direct « ${title} » du ${date}` : `Capture du direct « ${title} »`
    },
    comunidad: {
      eyebrow: "Communauté",
      title: "Ce qui se passe en direct",
      lead: "Chaque semaine le même rituel : on part la game, on lit le clavardage et on décide ensemble de la suite.",
      carouselAria: "Moments de la communauté"
    },
    juegos: {
      eyebrow: "À quoi on joue",
      title: "Jeux de rôle, défis et classiques insolites",
      lead: "Des longues sessions de jeu de rôle aux défis improvisés avec le chat : choisis une catégorie pour voir des extraits de chaque soirée.",
      categoryGroupAria: "Catégories de jeu",
      watchClips: "Voir les clips",
      features: [
        {
          icon: "leaf",
          title: "Survie et jeu de rôle",
          text: "Des parties de survie et de RP où l’histoire s’écrit avec ceux qui regardent."
        },
        {
          icon: "spark",
          title: "Défis avec le chat",
          text: "Des défis sur le vif : manger épicé dans le bois ou juste des pistolets sur l’île des morts."
        },
        {
          icon: "gamepad",
          title: "Classiques et pépites",
          text: "Des combats de Godzilla des années 90 aux jeux rétro que tout le monde a oubliés."
        },
        {
          icon: "moon",
          title: "Sessions qui s’étirent",
          text: "Spécial Halloween en deux parties, marathons qui se terminent aux petites heures."
        }
      ]
    },
    compania: {
      eyebrow: "Compagnie",
      title: "Le clavardage, c’est la moitié du stream",
      lead: "Pas de modérateurs sévères ni de règlements compliqués : tu arrives, tu dis salut et tu restes le temps que tu veux.",
      carouselAria: "Moments de jasette",
      bubbleLeft: "une p’tite dernière?",
      bubbleRight: "en reste deux, promis juré",
      chatCta: "Passer dans le clavardage",
      chatExchanges: [
        { left: "une p’tite dernière?", right: "en reste deux, promis juré" },
        { left: "ça marche pour vrai?", right: "regarde-le décoller" },
        { left: "pas game de sauter là", right: "tiens mon café" },
        { left: "on veille jusqu’à quelle heure?", right: "tant que le chat reste réveillé" }
      ],
      features: [
        {
          icon: "heart",
          title: "Chaleureux",
          text: "On t’accueille par ton nom dans le chat et on répond à ce que tu demandes."
        },
        {
          icon: "calendar",
          title: "Régulier",
          text: "La chaîne se met à jour chaque semaine, avec les captures de chaque soirée."
        },
        {
          icon: "spark",
          title: "Sans scénario",
          text: "Ce qui se passe en direct dépend de l’humeur du jour et de qui est branché."
        }
      ]
    },
    vision: {
      eyebrow: "Où on s’en va",
      lead: "L’idée est toute simple : que la chaîne grandisse au rythme de la gang déjà présente. Plus de soirs, plus de jeux, et toujours cette même ambiance relaxe."
    },
    cierre: {
      eyebrow: "Horaire et chaînes",
      sub: "On se voit en direct.",
      youtube: "Voir sur YouTube",
      twitch: "Voir sur Twitch",
      note: "twitch.tv/plottyplote666 · Tant que la gang reste",
      livePill: "Directs de fin de soirée · Ouvrir la chaîne",
      schedule: [
        { icon: "calendar", text: "Deux soirs par semaine" },
        { icon: "moon", text: "Soirées sans presse" },
        { icon: "chat", text: "Clavardage ouvert" }
      ],
      portraitAlt: "Portrait de plottyplote666"
    },
    carousel: {
      prev: "Photo précédente",
      next: "Photo suivante",
      tablist: "Sélectionner une photo",
      dot: (index2, total) => `Photo ${index2 + 1} de ${total}`
    },
    music: {
      hint: "Clique n’importe où pour activer le son",
      label: "Musique",
      muteAria: "Mettre la musique en sourdine",
      playAria: "Activer la musique de fond"
    },
    footer: {
      groups: [
        [
          { label: "La chaîne", href: "#canal" },
          { label: "Galerie", href: "#galeria" }
        ],
        [
          { label: "Twitch", href: "https://www.twitch.tv/plottyplote666" },
          { label: "YouTube", href: "https://www.youtube.com/@plottyplotesiro4549" },
          { label: "Vidéos", href: "https://www.youtube.com/@plottyplotesiro4549/videos" },
          { label: "Clips", href: "https://www.twitch.tv/plottyplote666/clips" }
        ],
        [
          { label: "Directs sur YouTube", href: "https://www.youtube.com/@plottyplotesiro4549/streams" },
          { label: "Clavardage Twitch", href: "https://www.twitch.tv/plottyplote666/chat" },
          { label: "À propos de la chaîne", href: "https://www.twitch.tv/plottyplote666/about" }
        ]
      ],
      copy: "© {year} plottyplote666",
      credits: "Site créé par Veltrix",
      langLabel: "Langue"
    }
  }
};
const STORAGE_KEY = "plottyplote_lang";
const SUPPORTED_LOCALES = ["es", "en", "fr"];
const DEFAULT_LOCALE = "es";
function detectBrowserLocale() {
  if (typeof window === "undefined" || !window.navigator) {
    return DEFAULT_LOCALE;
  }
  const languages = window.navigator.languages && window.navigator.languages.length > 0 ? window.navigator.languages : [window.navigator.language || ""];
  for (const raw of languages) {
    if (!raw) continue;
    const lower = raw.toLowerCase().trim();
    if (lower.startsWith("fr")) return "fr";
    if (lower.startsWith("en")) return "en";
    if (lower.startsWith("es")) return "es";
  }
  return DEFAULT_LOCALE;
}
function getInitialLocale() {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LOCALES.includes(saved)) {
        return saved;
      }
    } catch {
    }
  }
  return detectBrowserLocale();
}
function updateDocumentMeta(locale) {
  var _a2, _b2, _c, _d;
  if (typeof document === "undefined") return;
  const data = translations[locale] || translations[DEFAULT_LOCALE];
  document.documentElement.lang = data.htmlLang || locale;
  if ((_a2 = data.meta) == null ? void 0 : _a2.title) {
    document.title = data.meta.title;
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && ((_b2 = data.meta) == null ? void 0 : _b2.description)) {
    metaDesc.setAttribute("content", data.meta.description);
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && ((_c = data.meta) == null ? void 0 : _c.ogTitle)) {
    ogTitle.setAttribute("content", data.meta.ogTitle);
  }
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && ((_d = data.meta) == null ? void 0 : _d.ogDescription)) {
    ogDesc.setAttribute("content", data.meta.ogDescription);
  }
}
const initial = getInitialLocale();
let currentLocale = /* @__PURE__ */ state(proxy(initial));
if (typeof window !== "undefined") {
  updateDocumentMeta(initial);
}
const formatters = {
  es: new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }),
  en: new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric" }),
  fr: new Intl.DateTimeFormat("fr-CA", { day: "numeric", month: "long", year: "numeric" })
};
const i18n = {
  get locale() {
    return get(currentLocale);
  },
  get t() {
    return translations[get(currentLocale)] || translations[DEFAULT_LOCALE];
  },
  get supportedLocales() {
    return [
      { code: "es", label: "ES", title: "Español" },
      { code: "en", label: "EN", title: "English" },
      { code: "fr", label: "FR", title: "Français (Québec)" }
    ];
  },
  /**
   * Cambia el idioma de forma manual y persiste la preferencia del usuario.
   */
  setLocale(newLocale) {
    if (!SUPPORTED_LOCALES.includes(newLocale)) return;
    set(currentLocale, newLocale, true);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
    }
    updateDocumentMeta(newLocale);
  },
  /**
   * Formatea una fecha según el idioma activo.
   */
  formatDate(date) {
    if (!date) return this.t.gallery.defaultDateLabel;
    const formatter = formatters[get(currentLocale)] || formatters[DEFAULT_LOCALE];
    return formatter.format(date);
  },
  /**
   * Devuelve la etiqueta de fecha y el texto alt adaptado al idioma activo para un clip.
   */
  localizeClip(clip) {
    if (!clip) return clip;
    const dateLabel = clip.date ? this.formatDate(clip.date) : this.t.gallery.defaultDateLabel;
    const alt = this.t.gallery.clipAlt(clip.title, clip.date ? dateLabel : null);
    return { ...clip, dateLabel, alt };
  }
};
var root$8 = /* @__PURE__ */ from_html(`<button type="button"> </button>`);
var root_1$7 = /* @__PURE__ */ from_html(`<div role="group"></div>`);
function LangSwitch($$anchor, $$props) {
  push($$props, true);
  let onHero = prop($$props, "onHero", 3, false), compact = prop($$props, "compact", 3, false);
  var div = root_1$7();
  let classes;
  each(div, 21, () => i18n.supportedLocales, (item) => item.code, ($$anchor2, item) => {
    var button = root$8();
    let classes_1;
    var text = only_child(button, true);
    template_effect(() => {
      classes_1 = set_class(button, 1, "lang-pill svelte-f01c5n", null, classes_1, { "lang-pill--active": i18n.locale === get(item).code });
      set_attribute(button, "aria-pressed", i18n.locale === get(item).code);
      set_attribute(button, "title", get(item).title);
      set_text(text, get(item).label);
    });
    delegated("click", button, () => i18n.setLocale(get(item).code));
    append($$anchor2, button);
  });
  template_effect(() => {
    classes = set_class(div, 1, "lang-switch svelte-f01c5n", null, classes, {
      "lang-switch--hero": onHero(),
      "lang-switch--compact": compact()
    });
    set_attribute(div, "aria-label", i18n.t.nav.langAria);
  });
  append($$anchor, div);
  pop();
}
delegate(["click"]);
var root$7 = /* @__PURE__ */ from_svg(`<path d="M3.5 3.5l9 9M12.5 3.5l-9 9"></path>`);
var root_1$6 = /* @__PURE__ */ from_svg(`<path d="M2.5 5.5h11M2.5 10.5h11"></path>`);
var root_2$5 = /* @__PURE__ */ from_html(`<div class="menu-panel svelte-zne36e" id="menu-movil"><a class="menu-panel__link svelte-zne36e" href="#galeria"> </a> <a class="menu-panel__link svelte-zne36e" target="_blank" rel="noreferrer noopener"> </a> <div class="menu-panel__lang svelte-zne36e"><!></div></div>`);
var root_3$5 = /* @__PURE__ */ from_html(`<header><div class="inner svelte-zne36e"><a class="brand svelte-zne36e" href="#top"><img class="brand__logo svelte-zne36e" alt="" width="32" height="32"/> <span class="brand__name svelte-zne36e"><strong class="svelte-zne36e">plottyplote</strong><span class="svelte-zne36e">666</span></span></a> <nav class="svelte-zne36e"><!> <span class="nav-divider svelte-zne36e" aria-hidden="true"></span> <a class="pill pill--ghost nav-link svelte-zne36e" href="#galeria"> </a> <a class="pill pill--ghost nav-link svelte-zne36e" target="_blank" rel="noreferrer noopener"> </a> <a class="pill pill--primary svelte-zne36e" target="_blank" rel="noreferrer noopener"><span class="cta-full svelte-zne36e"> </span> <span class="cta-short svelte-zne36e">Twitch</span></a> <button type="button" class="pill pill--ghost menu-btn svelte-zne36e" aria-controls="menu-movil"><svg class="menu-btn__icon svelte-zne36e" viewBox="0 0 16 16" aria-hidden="true"><!></svg> <span class="svelte-zne36e"> </span></button></nav></div> <!></header>`);
function Header($$anchor, $$props) {
  push($$props, true);
  const TWITCH = "https://www.twitch.tv/plottyplote666";
  const YOUTUBE = "https://www.youtube.com/@plottyplotesiro4549";
  const DOCK_AFTER = 24;
  const UNDOCK_AT = 6;
  const DESKTOP_MIN = 900;
  let scrolled = /* @__PURE__ */ state(proxy(typeof document !== "undefined" && document.documentElement.scrollTop > DOCK_AFTER));
  let menuOpen = /* @__PURE__ */ state(false);
  let headerEl = /* @__PURE__ */ state(null);
  let menuBtn = /* @__PURE__ */ state(null);
  const solid = /* @__PURE__ */ user_derived(() => get(scrolled) || get(menuOpen));
  function closeMenu(focusBack = false) {
    var _a2;
    if (!get(menuOpen)) return;
    set(menuOpen, false);
    if (focusBack) (_a2 = get(menuBtn)) == null ? void 0 : _a2.focus();
  }
  function onWindowKeydown(event) {
    if (event.key === "Escape") closeMenu(true);
  }
  function onWindowPointerdown(event) {
    if (get(menuOpen) && get(headerEl) && !get(headerEl).contains(event.target)) {
      closeMenu();
    }
  }
  function goToTop(event) {
    event.preventDefault();
    history.pushState(null, "", "#top");
    window.scrollTo({
      top: 0,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
    closeMenu();
  }
  function goToGallery(event) {
    var _a2;
    event.preventDefault();
    history.pushState(null, "", "#galeria");
    (_a2 = document.getElementById("galeria")) == null ? void 0 : _a2.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
    closeMenu();
  }
  onMount(() => {
    const update = () => {
      const y = window.scrollY;
      set(scrolled, y > (get(scrolled) ? UNDOCK_AT : DOCK_AFTER));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("keydown", onWindowKeydown);
    window.addEventListener("pointerdown", onWindowPointerdown);
    const desktop = window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`);
    const onDesktop = (event) => {
      if (event.matches) closeMenu();
    };
    desktop.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("keydown", onWindowKeydown);
      window.removeEventListener("pointerdown", onWindowPointerdown);
      desktop.removeEventListener("change", onDesktop);
    };
  });
  var header = root_3$5();
  let classes;
  var div = child(header);
  var a = child(div);
  var img = child(a);
  var nav = sibling(a, 2);
  var node = child(nav);
  {
    let $0 = /* @__PURE__ */ user_derived(() => !get(scrolled) && !get(menuOpen));
    LangSwitch(node, {
      get onHero() {
        return get($0);
      }
    });
  }
  var a_1 = sibling(node, 4);
  var text = only_child(a_1, true);
  var a_2 = sibling(a_1, 2);
  set_attribute(a_2, "href", YOUTUBE);
  var text_1 = only_child(a_2, true);
  var a_3 = sibling(a_2, 2);
  set_attribute(a_3, "href", TWITCH);
  var span = child(a_3);
  var text_2 = only_child(span, true);
  var button = sibling(a_3, 2);
  var svg = child(button);
  var node_1 = child(svg);
  {
    var consequent = ($$anchor2) => {
      var path = root$7();
      append($$anchor2, path);
    };
    var alternate = ($$anchor2) => {
      var path_1 = root_1$6();
      append($$anchor2, path_1);
    };
    if_block(node_1, ($$render) => {
      if (get(menuOpen)) $$render(consequent);
      else $$render(alternate, -1);
    });
  }
  var span_1 = sibling(svg, 2);
  var text_3 = only_child(span_1, true);
  bind_this(button, ($$value) => set(menuBtn, $$value), () => get(menuBtn));
  var node_2 = sibling(div, 2);
  {
    var consequent_1 = ($$anchor2) => {
      var div_1 = root_2$5();
      var a_4 = child(div_1);
      var text_4 = only_child(a_4, true);
      var a_5 = sibling(a_4, 2);
      set_attribute(a_5, "href", YOUTUBE);
      var text_5 = only_child(a_5, true);
      var div_2 = sibling(a_5, 2);
      var node_3 = child(div_2);
      LangSwitch(node_3, { compact: true });
      template_effect(() => {
        set_text(text_4, i18n.t.nav.gallery);
        set_text(text_5, i18n.t.nav.youtube);
      });
      delegated("click", a_4, goToGallery);
      delegated("click", a_5, () => closeMenu());
      append($$anchor2, div_1);
    };
    if_block(node_2, ($$render) => {
      if (get(menuOpen)) $$render(consequent_1);
    });
  }
  bind_this(header, ($$value) => set(headerEl, $$value), () => get(headerEl));
  template_effect(() => {
    classes = set_class(header, 1, "site-header svelte-zne36e", null, classes, { "site-header--solid": get(solid) });
    set_attribute(img, "src", logo);
    set_attribute(nav, "aria-label", i18n.t.nav.mainAria);
    set_text(text, i18n.t.nav.gallery);
    set_text(text_1, i18n.t.nav.youtube);
    set_text(text_2, i18n.t.nav.twitch);
    set_attribute(button, "aria-expanded", get(menuOpen));
    set_attribute(button, "aria-label", i18n.t.nav.menuAria);
    set_text(text_3, i18n.t.nav.menu);
  });
  delegated("click", a, goToTop);
  delegated("click", a_1, goToGallery);
  delegated("click", button, () => get(menuOpen) ? closeMenu() : set(menuOpen, true));
  append($$anchor, header);
  pop();
}
delegate(["click"]);
enable_legacy_mode_flag();
var root$6 = /* @__PURE__ */ from_svg(`<svg class="footer-link__arrow svelte-9sff3o" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 8.5L8.5 3.5M4 3.5h4.5V8"></path></svg>`);
var root_1$5 = /* @__PURE__ */ from_html(`<a class="footer-link svelte-9sff3o"><span> </span> <!></a>`);
var root_2$4 = /* @__PURE__ */ from_html(`<div class="group svelte-9sff3o"></div>`);
var root_3$4 = /* @__PURE__ */ from_html(`<footer class="site-footer svelte-9sff3o"><div class="inner svelte-9sff3o"><div class="footer-top svelte-9sff3o"><div class="brand-col svelte-9sff3o"><a class="brand svelte-9sff3o" href="#top"><img class="brand__logo svelte-9sff3o" alt="" width="38" height="38" loading="lazy" decoding="async"/> <span class="brand__text svelte-9sff3o"><strong class="svelte-9sff3o">plottyplote</strong><span class="svelte-9sff3o">666</span></span></a> <p class="brand__sub svelte-9sff3o"> </p> <p class="brand__note svelte-9sff3o"> </p></div> <nav class="links svelte-9sff3o"></nav></div> <div class="footer-bottom svelte-9sff3o"><div class="footer-meta svelte-9sff3o"><p class="copy svelte-9sff3o"> </p> <span class="meta-dot svelte-9sff3o" aria-hidden="true">·</span> <p class="credits svelte-9sff3o"> <a href="mailto:veltrix093@outlook.com" class="svelte-9sff3o">veltrix093@outlook.com</a></p></div> <div class="footer-lang svelte-9sff3o"><span class="footer-lang__label svelte-9sff3o"> </span> <!></div></div></div></footer>`);
function Footer($$anchor, $$props) {
  push($$props, false);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  function handleAnchor(event, href) {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    history.pushState(null, "", href);
    if (href === "#top") {
      window.scrollTo({
        top: 0,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
      return;
    }
    const target = document.querySelector(href);
    target == null ? void 0 : target.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  }
  init();
  var footer = root_3$4();
  var div = child(footer);
  var div_1 = child(div);
  var div_2 = child(div_1);
  var a = child(div_2);
  var img = child(a);
  var p = sibling(a, 2);
  var text = only_child(p, true);
  var p_1 = sibling(p, 2);
  var text_1 = only_child(p_1, true);
  var nav = sibling(div_2, 2);
  each(nav, 5, () => i18n.t.footer.groups, index, ($$anchor2, group) => {
    var div_3 = root_2$4();
    each(div_3, 5, () => get(group), (link2) => link2.label, ($$anchor3, link2) => {
      const external = /* @__PURE__ */ derived_safe_equal(() => !get(link2).href.startsWith("#"));
      var a_1 = root_1$5();
      var span = child(a_1);
      var text_2 = only_child(span, true);
      var node = sibling(span, 2);
      {
        var consequent = ($$anchor4) => {
          var svg = root$6();
          append($$anchor4, svg);
        };
        if_block(node, ($$render) => {
          if (get(external)) $$render(consequent);
        });
      }
      template_effect(() => {
        set_attribute(a_1, "href", get(link2).href);
        set_attribute(a_1, "target", get(external) ? "_blank" : void 0);
        set_attribute(a_1, "rel", get(external) ? "noreferrer noopener" : void 0);
        set_text(text_2, get(link2).label);
      });
      delegated("click", a_1, (e) => handleAnchor(e, get(link2).href));
      append($$anchor3, a_1);
    });
    append($$anchor2, div_3);
  });
  var div_4 = sibling(div_1, 2);
  var div_5 = child(div_4);
  var p_2 = child(div_5);
  var text_3 = only_child(p_2, true);
  var p_3 = sibling(p_2, 4);
  var text_4 = child(p_3);
  var div_6 = sibling(div_5, 2);
  var span_1 = child(div_6);
  var text_5 = only_child(span_1, true);
  var node_1 = sibling(span_1, 2);
  LangSwitch(node_1, { compact: true });
  template_effect(
    ($0) => {
      set_attribute(img, "src", logo);
      set_text(text, i18n.t.hero.sub);
      set_text(text_1, i18n.t.cierre.note);
      set_attribute(nav, "aria-label", i18n.t.nav.mainAria);
      set_text(text_3, $0);
      set_text(text_4, `${i18n.t.footer.credits ?? ""} · `);
      set_text(text_5, i18n.t.footer.langLabel);
    },
    [() => i18n.t.footer.copy.replace("{year}", year)]
  );
  delegated("click", a, (e) => handleAnchor(e, "#top"));
  append($$anchor, footer);
  pop();
}
delegate(["click"]);
var root$5 = /* @__PURE__ */ from_svg(`<rect x="11.5" y="3.5" width="9" height="15" rx="4.5"></rect><path d="M7.5 15a8.5 8.5 0 0 0 17 0"></path><path d="M16 23.5V29"></path><path d="M12 29h8"></path>`, 1);
var root_1$4 = /* @__PURE__ */ from_svg(`<path d="M27 17.5a3.5 3.5 0 0 1-3.5 3.5H14l-6 5v-5H8.5A3.5 3.5 0 0 1 5 17.5v-9A3.5 3.5 0 0 1 8.5 5h15A3.5 3.5 0 0 1 27 8.5z"></path>`);
var root_2$3 = /* @__PURE__ */ from_svg(`<rect x="4.5" y="7.5" width="23" height="20" rx="4.5"></rect><path d="M4.5 14h23"></path><path d="M11 3.5v6"></path><path d="M21 3.5v6"></path>`, 1);
var root_3$3 = /* @__PURE__ */ from_svg(`<circle cx="12" cy="11" r="4.5"></circle><path d="M4 26c0-4.2 3.6-7 8-7s8 2.8 8 7"></path><path d="M21 7.2a4.5 4.5 0 0 1 0 8.6"></path><path d="M23.5 19.4c2.6.9 4.5 3.2 4.5 6.6"></path>`, 1);
var root_4$2 = /* @__PURE__ */ from_svg(`<path d="M24.5 19.6A9.5 9.5 0 0 1 12.4 7.5 9.5 9.5 0 1 0 24.5 19.6z"></path>`);
var root_5$2 = /* @__PURE__ */ from_svg(`<path d="M16 3.5l2.9 8.1 8.1 2.9-8.1 2.9L16 25.5l-2.9-8.1L5 14.5l8.1-2.9z"></path>`);
var root_6$2 = /* @__PURE__ */ from_svg(`<circle cx="16" cy="16" r="11.5"></circle><path d="M16 9.5V16l4.5 2.6"></path>`, 1);
var root_7$2 = /* @__PURE__ */ from_svg(`<path d="M6 18v-2.5a10 10 0 0 1 20 0V18"></path><rect x="4.5" y="17.5" width="5" height="8" rx="2.5"></rect><rect x="22.5" y="17.5" width="5" height="8" rx="2.5"></rect><path d="M25 25.5v1a3 3 0 0 1-3 3h-6"></path>`, 1);
var root_8$1 = /* @__PURE__ */ from_svg(`<rect x="3.5" y="6.5" width="25" height="16" rx="3.5"></rect><path d="M11 27.5h10"></path><path d="M16 22.5v5"></path>`, 1);
var root_9$1 = /* @__PURE__ */ from_svg(`<path d="M11 9.5h10a7.5 7.5 0 0 1 7.4 6.2l.9 5.2A3.6 3.6 0 0 1 25 24.9l-2.2-2.4h-9.6L11 24.9a3.6 3.6 0 0 1-5.3-4l.9-5.2A7.5 7.5 0 0 1 11 9.5z"></path><path d="M11.5 14v4"></path><path d="M9.5 16h4"></path><circle cx="21" cy="15.5" r="0.9"></circle><circle cx="23" cy="18.5" r="0.9"></circle>`, 1);
var root_10$1 = /* @__PURE__ */ from_svg(`<path d="M6 12.5h16v6a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z"></path><path d="M22 14.5h2a3.5 3.5 0 0 1 0 7h-2"></path><path d="M9.5 8.5c0-1.5 1.5-2 1.5-3.5"></path><path d="M15 8.5c0-1.5 1.5-2 1.5-3.5"></path>`, 1);
var root_11$1 = /* @__PURE__ */ from_svg(`<path d="M16 27s-9.5-5.6-9.5-12.4A5.6 5.6 0 0 1 16 10.6a5.6 5.6 0 0 1 9.5 4C25.5 21.4 16 27 16 27z"></path>`);
var root_12$1 = /* @__PURE__ */ from_svg(`<path d="M26 6c0 11-6.5 17-14 17H6.5C6.5 12.6 13.4 6 26 6z"></path><path d="M6.5 26c2.5-6.5 6.5-11 13-14"></path>`, 1);
var root_13 = /* @__PURE__ */ from_svg(`<circle cx="16" cy="16" r="12"></circle><path d="M13.5 11.5l7 4.5-7 4.5z"></path>`, 1);
var root_14 = /* @__PURE__ */ from_svg(`<path d="M12 22.5V9l11-2.2v12.4"></path><circle cx="9.2" cy="22.8" r="3.2"></circle><circle cx="20.2" cy="20.2" r="3.2"></circle>`, 1);
var root_15 = /* @__PURE__ */ from_svg(`<path d="M5 12v8h4.5L16 25.5v-19L9.5 12z"></path><path d="M20 11.5a7 7 0 0 1 0 9"></path><path d="M23 8.5a11 11 0 0 1 0 15"></path>`, 1);
var root_16 = /* @__PURE__ */ from_svg(`<path d="M19 6h7v7"></path><path d="M26 6l-7.5 7.5"></path><path d="M13 26H6v-7"></path><path d="M6 26l7.5-7.5"></path>`, 1);
var root_17 = /* @__PURE__ */ from_svg(`<path d="M8 8l16 16"></path><path d="M24 8L8 24"></path>`, 1);
var root_18 = /* @__PURE__ */ from_svg(`<path d="M19.5 7l-9 9 9 9"></path>`);
var root_19 = /* @__PURE__ */ from_svg(`<path d="M12.5 7l9 9-9 9"></path>`);
var root_20 = /* @__PURE__ */ from_svg(`<path d="M13 7h12v12"></path><path d="M25 7L12.5 19.5"></path><path d="M21 18v5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V13a2 2 0 0 1 2-2h5"></path>`, 1);
var root_21 = /* @__PURE__ */ from_svg(`<circle cx="16" cy="16" r="11"></circle>`);
var root_22 = /* @__PURE__ */ from_svg(`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><!></svg>`);
function Icon($$anchor, $$props) {
  let name = prop($$props, "name", 3, "spark"), size = prop($$props, "size", 3, 33), stroke = prop($$props, "stroke", 3, 1.5);
  var svg = root_22();
  var node = child(svg);
  {
    var consequent = ($$anchor2) => {
      var fragment = root$5();
      append($$anchor2, fragment);
    };
    var consequent_1 = ($$anchor2) => {
      var path = root_1$4();
      append($$anchor2, path);
    };
    var consequent_2 = ($$anchor2) => {
      var fragment_1 = root_2$3();
      append($$anchor2, fragment_1);
    };
    var consequent_3 = ($$anchor2) => {
      var fragment_2 = root_3$3();
      append($$anchor2, fragment_2);
    };
    var consequent_4 = ($$anchor2) => {
      var path_1 = root_4$2();
      append($$anchor2, path_1);
    };
    var consequent_5 = ($$anchor2) => {
      var path_2 = root_5$2();
      append($$anchor2, path_2);
    };
    var consequent_6 = ($$anchor2) => {
      var fragment_3 = root_6$2();
      append($$anchor2, fragment_3);
    };
    var consequent_7 = ($$anchor2) => {
      var fragment_4 = root_7$2();
      append($$anchor2, fragment_4);
    };
    var consequent_8 = ($$anchor2) => {
      var fragment_5 = root_8$1();
      append($$anchor2, fragment_5);
    };
    var consequent_9 = ($$anchor2) => {
      var fragment_6 = root_9$1();
      append($$anchor2, fragment_6);
    };
    var consequent_10 = ($$anchor2) => {
      var fragment_7 = root_10$1();
      append($$anchor2, fragment_7);
    };
    var consequent_11 = ($$anchor2) => {
      var path_3 = root_11$1();
      append($$anchor2, path_3);
    };
    var consequent_12 = ($$anchor2) => {
      var fragment_8 = root_12$1();
      append($$anchor2, fragment_8);
    };
    var consequent_13 = ($$anchor2) => {
      var fragment_9 = root_13();
      append($$anchor2, fragment_9);
    };
    var consequent_14 = ($$anchor2) => {
      var fragment_10 = root_14();
      append($$anchor2, fragment_10);
    };
    var consequent_15 = ($$anchor2) => {
      var fragment_11 = root_15();
      append($$anchor2, fragment_11);
    };
    var consequent_16 = ($$anchor2) => {
      var fragment_12 = root_16();
      append($$anchor2, fragment_12);
    };
    var consequent_17 = ($$anchor2) => {
      var fragment_13 = root_17();
      append($$anchor2, fragment_13);
    };
    var consequent_18 = ($$anchor2) => {
      var path_4 = root_18();
      append($$anchor2, path_4);
    };
    var consequent_19 = ($$anchor2) => {
      var path_5 = root_19();
      append($$anchor2, path_5);
    };
    var consequent_20 = ($$anchor2) => {
      var fragment_14 = root_20();
      append($$anchor2, fragment_14);
    };
    var alternate = ($$anchor2) => {
      var circle = root_21();
      append($$anchor2, circle);
    };
    if_block(node, ($$render) => {
      if (name() === "mic") $$render(consequent);
      else if (name() === "chat") $$render(consequent_1, 1);
      else if (name() === "calendar") $$render(consequent_2, 2);
      else if (name() === "users") $$render(consequent_3, 3);
      else if (name() === "moon") $$render(consequent_4, 4);
      else if (name() === "spark") $$render(consequent_5, 5);
      else if (name() === "clock") $$render(consequent_6, 6);
      else if (name() === "headset") $$render(consequent_7, 7);
      else if (name() === "monitor") $$render(consequent_8, 8);
      else if (name() === "gamepad") $$render(consequent_9, 9);
      else if (name() === "coffee") $$render(consequent_10, 10);
      else if (name() === "heart") $$render(consequent_11, 11);
      else if (name() === "leaf") $$render(consequent_12, 12);
      else if (name() === "play") $$render(consequent_13, 13);
      else if (name() === "music") $$render(consequent_14, 14);
      else if (name() === "volume") $$render(consequent_15, 15);
      else if (name() === "expand") $$render(consequent_16, 16);
      else if (name() === "close") $$render(consequent_17, 17);
      else if (name() === "chevron-left") $$render(consequent_18, 18);
      else if (name() === "chevron-right") $$render(consequent_19, 19);
      else if (name() === "external") $$render(consequent_20, 20);
      else $$render(alternate, -1);
    });
  }
  template_effect(() => {
    set_attribute(svg, "width", size());
    set_attribute(svg, "height", size());
    set_attribute(svg, "stroke-width", stroke());
  });
  append($$anchor, svg);
}
const musicUrl = "" + new URL("2-QfnrmOwW.mp3", import.meta.url).href;
var root$4 = /* @__PURE__ */ from_html(`<button type="button" class="hint svelte-plfcsu"><!> <span> </span></button>`);
var root_1$3 = /* @__PURE__ */ from_html(`<div class="music-controls svelte-plfcsu"><!> <audio class="track svelte-plfcsu" loop="" preload="auto" playsinline="" autoplay=""></audio> <button type="button"><!> <span> </span></button></div>`);
function MusicToggle($$anchor, $$props) {
  push($$props, true);
  const TARGET_VOLUME = 0.3;
  const FADE_MS = 1800;
  const ACTIVATION = [
    "pointerdown",
    "pointerup",
    "mousedown",
    "mouseup",
    "click",
    "keydown",
    "keyup",
    "touchstart",
    "touchend",
    "input",
    "change",
    "submit"
  ];
  const LIFE = ["pointermove", "wheel", "scroll"];
  let audio = /* @__PURE__ */ state(null);
  let playing = /* @__PURE__ */ state(
    false
    // sonando de verdad (audible)
  );
  let waiting = /* @__PURE__ */ state(
    false
    // sonando en silencio, esperando desbloquearse
  );
  let dismissed = /* @__PURE__ */ state(
    false
    // apagado a mano por el usuario
  );
  let fadeTimer = 0;
  let listening = false;
  let lifeTried = false;
  function fadeIn() {
    if (!get(audio)) return;
    clearInterval(fadeTimer);
    if (get(audio).volume >= TARGET_VOLUME) return;
    const start2 = performance.now();
    get(audio).volume = 0.02;
    fadeTimer = setInterval(
      () => {
        if (!get(audio)) return clearInterval(fadeTimer);
        const progress = Math.min(1, (performance.now() - start2) / FADE_MS);
        get(audio).volume = TARGET_VOLUME * progress;
        if (progress >= 1) {
          get(audio).volume = TARGET_VOLUME;
          clearInterval(fadeTimer);
        }
      },
      60
    );
  }
  function markAudible() {
    set(playing, true);
    set(waiting, false);
    fadeIn();
    stopListening();
  }
  function start() {
    if (!get(audio) || get(dismissed)) return;
    get(audio).muted = false;
    get(audio).play().then(() => {
      if (get(audio).muted) set(waiting, true);
      else markAudible();
    }).catch(() => startMuted());
  }
  function startMuted() {
    if (!get(audio) || get(dismissed)) return;
    get(audio).muted = true;
    get(audio).play().then(() => {
      if (get(audio).muted) set(waiting, true);
    }).catch(() => {
    });
  }
  function unlock() {
    if (!get(audio) || get(dismissed)) return;
    if (get(audio).paused) {
      start();
      return;
    }
    if (!get(audio).muted) {
      markAudible();
      return;
    }
    get(audio).muted = false;
    const playPromise = get(audio).play();
    if (playPromise !== void 0) {
      playPromise.then(() => {
        markAudible();
      }).catch(() => {
        startMuted();
      });
    } else {
      markAudible();
    }
  }
  function listen() {
    if (listening) return;
    listening = true;
    for (const type of ACTIVATION) {
      window.addEventListener(type, onActivation, { capture: true, passive: true });
    }
    for (const type of LIFE) {
      window.addEventListener(type, onLife, { capture: true, passive: true });
    }
  }
  function stopListening() {
    if (!listening) return;
    listening = false;
    for (const type of ACTIVATION) window.removeEventListener(type, onActivation, true);
    for (const type of LIFE) window.removeEventListener(type, onLife, true);
  }
  function onActivation(e) {
    var _a2, _b2;
    if (get(dismissed)) {
      stopListening();
      return;
    }
    if ((_b2 = (_a2 = e == null ? void 0 : e.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, ".music-controls")) return;
    if (get(audio) && !get(audio).paused && !get(audio).muted) {
      markAudible();
      return;
    }
    unlock();
  }
  function onLife() {
    if (lifeTried || get(dismissed) || !get(audio) || get(audio).paused || !get(audio).muted) return;
    lifeTried = true;
    unlock();
  }
  function onWake() {
    if (!get(audio) || get(dismissed)) return;
    if (get(audio).paused) {
      start();
      return;
    }
    onLife();
  }
  function toggle() {
    if (!get(audio)) return;
    if (get(audio).paused) {
      set(dismissed, false);
      start();
    } else if (get(audio).muted) {
      set(dismissed, false);
      unlock();
    } else {
      set(dismissed, true);
      set(playing, false);
      set(waiting, false);
      clearInterval(fadeTimer);
      get(audio).pause();
      stopListening();
    }
  }
  onMount(() => {
    if (!get(audio)) return;
    get(audio).volume = 0;
    const sync = () => {
      set(playing, !get(audio).paused && !get(audio).muted, true);
      set(waiting, !get(audio).paused && get(audio).muted, true);
    };
    get(audio).addEventListener("play", sync);
    get(audio).addEventListener("pause", sync);
    get(audio).addEventListener("volumechange", sync);
    listen();
    start();
    document.addEventListener("visibilitychange", onWake);
    window.addEventListener("pageshow", onWake);
    window.addEventListener("focus", onWake);
    get(audio).addEventListener("canplay", onWake);
    return () => {
      stopListening();
      clearInterval(fadeTimer);
      document.removeEventListener("visibilitychange", onWake);
      window.removeEventListener("pageshow", onWake);
      window.removeEventListener("focus", onWake);
      get(audio).removeEventListener("canplay", onWake);
      get(audio).removeEventListener("play", sync);
      get(audio).removeEventListener("pause", sync);
      get(audio).removeEventListener("volumechange", sync);
      get(audio).pause();
    };
  });
  var div = root_1$3();
  var node = child(div);
  {
    var consequent = ($$anchor2) => {
      var button = root$4();
      var node_1 = child(button);
      Icon(node_1, { name: "volume", size: 15 });
      var span = sibling(node_1, 2);
      var text = only_child(span, true);
      template_effect(() => set_text(text, i18n.t.music.hint));
      delegated("click", button, toggle);
      append($$anchor2, button);
    };
    if_block(node, ($$render) => {
      if (get(waiting)) $$render(consequent);
    });
  }
  var audio_1 = sibling(node, 2);
  bind_this(audio_1, ($$value) => set(audio, $$value), () => get(audio));
  var button_1 = sibling(audio_1, 2);
  let classes;
  var node_2 = child(button_1);
  Icon(node_2, { name: "music", size: 18 });
  var span_1 = sibling(node_2, 2);
  var text_1 = only_child(span_1, true);
  template_effect(() => {
    set_attribute(audio_1, "src", musicUrl);
    classes = set_class(button_1, 1, "toggle svelte-plfcsu", null, classes, { "toggle--on": get(playing) });
    set_attribute(button_1, "aria-pressed", get(playing));
    set_attribute(button_1, "aria-label", get(playing) ? i18n.t.music.muteAria : i18n.t.music.playAria);
    set_text(text_1, i18n.t.music.label);
  });
  delegated("click", button_1, toggle);
  append($$anchor, div);
  pop();
}
delegate(["click"]);
function reveal(node, options = {}) {
  const { delay = 0, distance = 16 } = options;
  node.classList.add("reveal");
  if (delay) node.style.setProperty("--reveal-delay", `${delay}ms`);
  if (distance !== 16) node.style.setProperty("--reveal-y", `${distance}px`);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    node.classList.add("reveal--in");
    return {};
  }
  if (!("IntersectionObserver" in window)) {
    node.classList.add("reveal--in");
    return {};
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        node.classList.add("reveal--in");
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
  );
  observer.observe(node);
  return {
    destroy() {
      observer.disconnect();
    }
  };
}
var root$3 = /* @__PURE__ */ from_html(`<div class="row svelte-9r82hi"><span class="row__icon svelte-9r82hi"><!></span> <div class="row__body svelte-9r82hi"><p class="row__title svelte-9r82hi"> </p> <p class="row__text svelte-9r82hi"> </p></div></div>`);
function IconRow($$anchor, $$props) {
  let icon = prop($$props, "icon", 3, "spark"), title = prop($$props, "title", 3, ""), text = prop($$props, "text", 3, ""), delay = prop($$props, "delay", 3, 0);
  var div = root$3();
  var span = child(div);
  var node = child(span);
  Icon(node, {
    get name() {
      return icon();
    },
    size: 36
  });
  var div_1 = sibling(span, 2);
  var p = child(div_1);
  var text_1 = only_child(p, true);
  var p_1 = sibling(p, 2);
  var text_2 = only_child(p_1, true);
  action(div, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: delay() }));
  template_effect(() => {
    set_text(text_1, title());
    set_text(text_2, text());
  });
  append($$anchor, div);
}
function buildCompanySlides(clips2 = [], exchanges = []) {
  return clips2.map((clip, index2) => {
    const exchange = exchanges[index2] ?? null;
    return {
      id: clip.id ?? String(index2),
      src: clip.src,
      alt: clip.alt ?? "",
      label: clip.title ?? "",
      bubbleLeft: (exchange == null ? void 0 : exchange.left) ?? "",
      bubbleRight: (exchange == null ? void 0 : exchange.right) ?? ""
    };
  });
}
function clampSlideIndex(index2, total) {
  if (!total || total <= 0) return 0;
  return Math.max(0, Math.min(index2, total - 1));
}
var root$2 = /* @__PURE__ */ from_html(`<p class="bubble bubble--left svelte-mn4w18"> </p>`);
var root_1$2 = /* @__PURE__ */ from_html(`<p class="bubble bubble--right svelte-mn4w18"> </p>`);
var root_2$2 = /* @__PURE__ */ from_html(`<div aria-hidden="true"><!> <!></div>`);
var root_3$2 = /* @__PURE__ */ from_html(`<div class="slide svelte-mn4w18"><div class="frame svelte-mn4w18"><img loading="lazy" decoding="async" class="svelte-mn4w18"/> <div class="scrim svelte-mn4w18" aria-hidden="true"></div> <!></div></div>`);
var root_4$1 = /* @__PURE__ */ from_html(`<div class="nav svelte-mn4w18"><button type="button" class="svelte-mn4w18"><!></button> <span class="nav__label svelte-mn4w18"> </span> <button type="button" class="svelte-mn4w18"><!></button></div>`);
var root_5$1 = /* @__PURE__ */ from_html(`<button type="button"></button>`);
var root_6$1 = /* @__PURE__ */ from_html(`<div class="dots svelte-mn4w18" role="group"></div>`);
var root_7$1 = /* @__PURE__ */ from_html(`<div class="company-carousel svelte-mn4w18" role="region" aria-roledescription="carousel"><div class="viewport svelte-mn4w18"><div class="track svelte-mn4w18"></div> <!></div> <!></div>`);
function CompanyCarousel($$anchor, $$props) {
  push($$props, true);
  let items = prop($$props, "items", 19, () => []), ariaLabel = prop($$props, "ariaLabel", 3, "");
  let track = /* @__PURE__ */ state(null);
  let active = /* @__PURE__ */ state(0);
  const atStart = /* @__PURE__ */ user_derived(() => get(active) <= 0);
  const atEnd = /* @__PURE__ */ user_derived(() => get(active) >= items().length - 1);
  function go(dir) {
    goTo(get(active) + dir);
  }
  function goTo(index2) {
    if (!get(track) || !items().length) return;
    const next = clampSlideIndex(index2, items().length);
    get(track).scrollTo({ left: next * get(track).clientWidth, behavior: "smooth" });
  }
  function handleScroll() {
    if (!get(track) || !items().length) return;
    const width = get(track).clientWidth || 1;
    set(active, clampSlideIndex(Math.round(get(track).scrollLeft / width), items().length), true);
  }
  function handleKeydown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  }
  onMount(() => {
    if (!get(track)) return;
    get(track).addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      get(track).removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  });
  var div = root_7$1();
  var div_1 = child(div);
  var div_2 = child(div_1);
  each(div_2, 23, items, (item) => item.id || item.src, ($$anchor2, item, index2) => {
    var div_3 = root_3$2();
    var div_4 = child(div_3);
    var img = child(div_4);
    var node = sibling(img, 4);
    {
      var consequent_2 = ($$anchor3) => {
        var div_5 = root_2$2();
        let classes;
        var node_1 = child(div_5);
        {
          var consequent = ($$anchor4) => {
            var p = root$2();
            var text = only_child(p, true);
            template_effect(() => set_text(text, get(item).bubbleLeft));
            append($$anchor4, p);
          };
          if_block(node_1, ($$render) => {
            if (get(item).bubbleLeft) $$render(consequent);
          });
        }
        var node_2 = sibling(node_1, 2);
        {
          var consequent_1 = ($$anchor4) => {
            var p_1 = root_1$2();
            var text_1 = only_child(p_1, true);
            template_effect(() => set_text(text_1, get(item).bubbleRight));
            append($$anchor4, p_1);
          };
          if_block(node_2, ($$render) => {
            if (get(item).bubbleRight) $$render(consequent_1);
          });
        }
        template_effect(() => classes = set_class(div_5, 1, "bubbles svelte-mn4w18", null, classes, { "bubbles--active": get(index2) === get(active) }));
        append($$anchor3, div_5);
      };
      if_block(node, ($$render) => {
        if (get(item).bubbleLeft || get(item).bubbleRight) $$render(consequent_2);
      });
    }
    template_effect(() => {
      set_attribute(div_3, "aria-hidden", get(index2) !== get(active));
      set_attribute(img, "src", get(item).src);
      set_attribute(img, "alt", get(item).alt);
    });
    append($$anchor2, div_3);
  });
  bind_this(div_2, ($$value) => set(track, $$value), () => get(track));
  var node_3 = sibling(div_2, 2);
  {
    var consequent_3 = ($$anchor2) => {
      var div_6 = root_4$1();
      var button = child(div_6);
      var node_4 = child(button);
      Icon(node_4, { name: "chevron-left", size: 16, stroke: 1.8 });
      var span = sibling(button, 2);
      var text_2 = only_child(span, true);
      var button_1 = sibling(span, 2);
      var node_5 = child(button_1);
      Icon(node_5, { name: "chevron-right", size: 16, stroke: 1.8 });
      template_effect(() => {
        var _a2;
        button.disabled = get(atStart);
        set_attribute(button, "aria-label", i18n.t.carousel.prev);
        set_text(text_2, ((_a2 = items()[get(active)]) == null ? void 0 : _a2.label) ?? "");
        button_1.disabled = get(atEnd);
        set_attribute(button_1, "aria-label", i18n.t.carousel.next);
      });
      delegated("click", button, () => go(-1));
      delegated("click", button_1, () => go(1));
      append($$anchor2, div_6);
    };
    if_block(node_3, ($$render) => {
      if (items().length > 1) $$render(consequent_3);
    });
  }
  var node_6 = sibling(div_1, 2);
  {
    var consequent_4 = ($$anchor2) => {
      var div_7 = root_6$1();
      each(div_7, 23, items, (item) => item.id || item.src, ($$anchor3, item, index2) => {
        var button_2 = root_5$1();
        let classes_1;
        template_effect(
          ($0) => {
            classes_1 = set_class(button_2, 1, "dot svelte-mn4w18", null, classes_1, { "dot--on": get(index2) === get(active) });
            set_attribute(button_2, "aria-current", get(index2) === get(active) ? "true" : void 0);
            set_attribute(button_2, "aria-label", $0);
          },
          [() => i18n.t.carousel.dot(get(index2), items().length)]
        );
        delegated("click", button_2, () => goTo(get(index2)));
        append($$anchor3, button_2);
      });
      template_effect(() => set_attribute(div_7, "aria-label", i18n.t.carousel.tablist));
      append($$anchor2, div_7);
    };
    if_block(node_6, ($$render) => {
      if (items().length > 1) $$render(consequent_4);
    });
  }
  template_effect(() => set_attribute(div, "aria-label", ariaLabel() || i18n.t.compania.carouselAria));
  delegated("keydown", div, handleKeydown);
  append($$anchor, div);
  pop();
}
delegate(["keydown", "click"]);
function formatStreamNumber(n) {
  const num = Number(n);
  if (!Number.isFinite(num) || num < 0) return "00";
  return String(Math.floor(num)).padStart(2, "0");
}
function getClipPeriodKey(clip) {
  if ((clip == null ? void 0 : clip.date) instanceof Date && !Number.isNaN(clip.date.getTime())) {
    const year = clip.date.getFullYear();
    const month = String(clip.date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }
  return "archive";
}
function formatPeriodLabel(periodKey, dateLocale = "es-ES", archiveLabel = "Archivo") {
  if (periodKey === "archive") return archiveLabel;
  const match = String(periodKey).match(/^(\d{4})-(\d{2})$/);
  if (!match) return periodKey;
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const sampleDate = new Date(year, monthIndex, 15);
  const formatted = new Intl.DateTimeFormat(dateLocale, {
    month: "short",
    year: "numeric"
  }).format(sampleDate).replace(/\./g, "").trim();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
function buildPeriodFilters(clips2 = [], { allLabel = "Todas", archiveLabel = "Archivo", dateLocale = "es-ES" } = {}) {
  const counts = /* @__PURE__ */ new Map();
  const order = [];
  for (const clip of clips2) {
    const key2 = getClipPeriodKey(clip);
    if (!counts.has(key2)) {
      counts.set(key2, 0);
      order.push(key2);
    }
    counts.set(key2, counts.get(key2) + 1);
  }
  const filters = [{ id: "all", label: allLabel, count: clips2.length }];
  for (const key2 of order) {
    if (key2 === "archive") continue;
    filters.push({
      id: key2,
      label: formatPeriodLabel(key2, dateLocale, archiveLabel),
      count: counts.get(key2)
    });
  }
  if (counts.has("archive")) {
    filters.push({
      id: "archive",
      label: archiveLabel,
      count: counts.get("archive")
    });
  }
  return filters;
}
function filterClips(clips2 = [], filterId = "all") {
  if (!filterId || filterId === "all") return clips2;
  return clips2.filter((clip) => getClipPeriodKey(clip) === filterId);
}
function partitionGalleryClips(filteredClips = [], { filterId = "all", showAll = false, initialLimit = 6 } = {}) {
  if (!filteredClips.length) {
    return {
      featured: null,
      gridItems: [],
      remainingCount: 0,
      canToggle: false,
      lightboxItems: []
    };
  }
  if (filterId === "all") {
    const featured = filteredClips[0];
    const rest = filteredClips.slice(1);
    const gridItems = showAll ? rest : rest.slice(0, initialLimit);
    const remainingCount = Math.max(0, rest.length - gridItems.length);
    const canToggle = rest.length > initialLimit;
    return {
      featured,
      gridItems,
      remainingCount,
      canToggle,
      lightboxItems: filteredClips
    };
  }
  return {
    featured: null,
    gridItems: filteredClips,
    remainingCount: 0,
    canToggle: false,
    lightboxItems: filteredClips
  };
}
function stepIndex(current, direction, total) {
  if (!total || total <= 0) return 0;
  return (current + direction + total) % total;
}
var root$1 = /* @__PURE__ */ from_html(`<button type="button"><span> </span> <span class="filter-count svelte-ewh1ap"> </span></button>`);
var root_1$1 = /* @__PURE__ */ from_html(`<div class="filter-bar svelte-ewh1ap" role="group"></div>`);
var root_2$1 = /* @__PURE__ */ from_html(`<button type="button" class="featured svelte-ewh1ap"><span class="featured__frame svelte-ewh1ap"><img decoding="async" class="svelte-ewh1ap"/> <span class="float-pill float-pill--top"><span class="dot" aria-hidden="true"></span> <span> </span></span> <span class="pill pill--glass featured__cta svelte-ewh1ap" aria-hidden="true"><!> <span> </span></span></span> <span class="featured__meta svelte-ewh1ap"><span class="featured__num svelte-ewh1ap"> </span> <span class="featured__title svelte-ewh1ap"> </span></span></button>`);
var root_3$1 = /* @__PURE__ */ from_html(`<button type="button" class="card svelte-ewh1ap"><span class="thumb svelte-ewh1ap"><img loading="lazy" decoding="async" class="svelte-ewh1ap"/> <span class="thumb__badge svelte-ewh1ap" aria-hidden="true"><!></span></span> <span class="meta svelte-ewh1ap"><span class="meta__top svelte-ewh1ap"><span class="date svelte-ewh1ap"> </span> <span class="num svelte-ewh1ap"> </span></span> <span class="title svelte-ewh1ap"> </span></span></button>`);
var root_4 = /* @__PURE__ */ from_html(`<div class="grid svelte-ewh1ap" data-testid="gallery-grid"></div>`);
var root_5 = /* @__PURE__ */ from_html(`<p class="empty svelte-ewh1ap"> </p>`);
var root_6 = /* @__PURE__ */ from_html(`<div class="grid-toggle svelte-ewh1ap"><button type="button" class="pill pill--ghost"> </button></div>`);
var root_7 = /* @__PURE__ */ from_html(`<img/>`);
var root_8 = /* @__PURE__ */ from_html(`<div class="nav svelte-ewh1ap"><button type="button" class="svelte-ewh1ap"><!></button> <span class="count svelte-ewh1ap"> </span> <button type="button" class="svelte-ewh1ap"><!></button></div>`);
var root_9 = /* @__PURE__ */ from_html(`<button type="button"><img alt="" loading="lazy" decoding="async" class="svelte-ewh1ap"/></button>`);
var root_10 = /* @__PURE__ */ from_html(`<div class="filmstrip svelte-ewh1ap" role="group"></div>`);
var root_11 = /* @__PURE__ */ from_html(`<figure class="panel svelte-ewh1ap" tabindex="-1"><div class="frame svelte-ewh1ap"><!> <div class="top-bar svelte-ewh1ap"><span class="top-badge svelte-ewh1ap"> </span> <div class="top-actions svelte-ewh1ap"><button type="button" class="fit-btn svelte-ewh1ap"> </button> <button type="button" class="close svelte-ewh1ap"><!></button></div></div> <!></div> <figcaption class="caption svelte-ewh1ap"><div class="caption__info svelte-ewh1ap"><p class="caption__date svelte-ewh1ap"> </p> <h3 class="svelte-ewh1ap"> </h3></div> <a class="pill pill--ghost caption__link svelte-ewh1ap" href="https://www.twitch.tv/plottyplote666/videos" target="_blank" rel="noreferrer noopener"><span> </span> <!></a></figcaption> <!></figure>`);
var root_12 = /* @__PURE__ */ from_html(`<div class="gallery-shell svelte-ewh1ap"><!> <!> <!> <!></div> <dialog class="lightbox svelte-ewh1ap"><!></dialog>`, 1);
function Gallery($$anchor, $$props) {
  push($$props, true);
  let items = prop($$props, "items", 19, () => []);
  let dialog = /* @__PURE__ */ state(null);
  let panelEl = /* @__PURE__ */ state(null);
  let activeFilter = /* @__PURE__ */ state("all");
  let showAll = /* @__PURE__ */ state(false);
  let current = /* @__PURE__ */ state(0);
  let fitMode = /* @__PURE__ */ state("contain");
  let filmstripEl = /* @__PURE__ */ state(null);
  let pointerStartX = null;
  const localizedItems = /* @__PURE__ */ user_derived(() => items().map((clip) => i18n.localizeClip(clip)));
  const filters = /* @__PURE__ */ user_derived(() => buildPeriodFilters(get(localizedItems), {
    allLabel: i18n.t.gallery.filterAll,
    archiveLabel: i18n.t.gallery.filterArchive,
    dateLocale: i18n.t.dateLocale
  }));
  const filteredItems = /* @__PURE__ */ user_derived(() => filterClips(get(localizedItems), get(activeFilter)));
  const partitioned = /* @__PURE__ */ user_derived(() => partitionGalleryClips(get(filteredItems), {
    filterId: get(activeFilter),
    showAll: get(showAll),
    initialLimit: 6
  }));
  const lightboxItems = /* @__PURE__ */ user_derived(() => get(partitioned).lightboxItems);
  const active = /* @__PURE__ */ user_derived(() => get(lightboxItems)[get(current)] ?? null);
  function selectFilter(filterId) {
    if (get(activeFilter) === filterId) return;
    set(activeFilter, filterId, true);
    set(showAll, false);
    set(current, 0);
  }
  function openAt(index2) {
    var _a2;
    if (!get(lightboxItems).length) return;
    set(current, Math.max(0, Math.min(index2, get(lightboxItems).length - 1)), true);
    (_a2 = get(dialog)) == null ? void 0 : _a2.showModal();
    tick().then(() => {
      var _a3;
      return (_a3 = get(panelEl)) == null ? void 0 : _a3.focus({ preventScroll: true });
    });
  }
  function close() {
    var _a2;
    (_a2 = get(dialog)) == null ? void 0 : _a2.close();
  }
  function step(direction) {
    if (!get(lightboxItems).length) return;
    set(current, stepIndex(get(current), direction, get(lightboxItems).length), true);
  }
  function toggleFitMode() {
    set(fitMode, get(fitMode) === "contain" ? "cover" : "contain", true);
  }
  function handleKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      set(current, 0);
    } else if (event.key === "End" && get(lightboxItems).length > 0) {
      event.preventDefault();
      set(current, get(lightboxItems).length - 1);
    }
  }
  function handleBackdrop(event) {
    if (event.target === get(dialog)) close();
  }
  function handlePointerDown(event) {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    pointerStartX = event.clientX;
  }
  function handlePointerUp(event) {
    if (pointerStartX === null) return;
    const dx = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(dx) < 48) return;
    step(dx < 0 ? 1 : -1);
  }
  user_effect(() => {
    var _a2;
    const idx = get(current);
    if (!((_a2 = get(dialog)) == null ? void 0 : _a2.open) || !get(filmstripEl)) return;
    tick().then(() => {
      var _a3;
      const target = (_a3 = get(filmstripEl)) == null ? void 0 : _a3.querySelector(`[data-thumb-index="${idx}"]`);
      target == null ? void 0 : target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
  });
  var fragment = root_12();
  var div = first_child(fragment);
  var node = child(div);
  {
    var consequent = ($$anchor2) => {
      var div_1 = root_1$1();
      each(div_1, 21, () => get(filters), (filter) => filter.id, ($$anchor3, filter) => {
        var button = root$1();
        let classes;
        var span = child(button);
        var text = only_child(span, true);
        var span_1 = sibling(span, 2);
        var text_1 = only_child(span_1, true);
        template_effect(() => {
          classes = set_class(button, 1, "filter-pill svelte-ewh1ap", null, classes, {
            "filter-pill--active": get(activeFilter) === get(filter).id
          });
          set_attribute(button, "aria-pressed", get(activeFilter) === get(filter).id);
          set_text(text, get(filter).label);
          set_text(text_1, get(filter).count);
        });
        delegated("click", button, () => selectFilter(get(filter).id));
        append($$anchor3, button);
      });
      action(div_1, ($$node) => reveal == null ? void 0 : reveal($$node));
      template_effect(() => set_attribute(div_1, "aria-label", i18n.t.gallery.filterAria));
      append($$anchor2, div_1);
    };
    if_block(node, ($$render) => {
      if (get(filters).length > 1) $$render(consequent);
    });
  }
  var node_1 = sibling(node, 2);
  {
    var consequent_1 = ($$anchor2) => {
      const featured = /* @__PURE__ */ user_derived(() => get(partitioned).featured);
      var button_1 = root_2$1();
      var span_2 = child(button_1);
      var img = child(span_2);
      var span_3 = sibling(img, 2);
      var span_4 = sibling(child(span_3), 2);
      var text_2 = only_child(span_4);
      var span_5 = sibling(span_3, 2);
      var node_2 = child(span_5);
      Icon(node_2, { name: "expand", size: 16, stroke: 1.6 });
      var span_6 = sibling(node_2, 2);
      var text_3 = only_child(span_6, true);
      var span_7 = sibling(span_2, 2);
      var span_8 = child(span_7);
      var text_4 = only_child(span_8);
      var span_9 = sibling(span_8, 2);
      var text_5 = only_child(span_9, true);
      action(button_1, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 60 }));
      template_effect(
        ($0, $1) => {
          set_attribute(button_1, "aria-label", $0);
          set_attribute(img, "src", get(featured).src);
          set_attribute(img, "alt", get(featured).alt);
          set_text(text_2, `${i18n.t.gallery.featuredBadge ?? ""} · ${get(featured).dateLabel ?? ""}`);
          set_text(text_3, i18n.t.gallery.viewFull);
          set_text(text_4, `#${$1 ?? ""}`);
          set_text(text_5, get(featured).title);
        },
        [
          () => i18n.t.gallery.cardAria(get(featured).title),
          () => formatStreamNumber(get(featured).n)
        ]
      );
      delegated("click", button_1, () => openAt(0));
      append($$anchor2, button_1);
    };
    if_block(node_1, ($$render) => {
      if (get(partitioned).featured) $$render(consequent_1);
    });
  }
  var node_3 = sibling(node_1, 2);
  {
    var consequent_2 = ($$anchor2) => {
      var div_2 = root_4();
      each(div_2, 23, () => get(partitioned).gridItems, (clip) => clip.id, ($$anchor3, clip, index2) => {
        const lightboxIndex = /* @__PURE__ */ user_derived(() => get(partitioned).featured ? get(index2) + 1 : get(index2));
        var button_2 = root_3$1();
        var span_10 = child(button_2);
        var img_1 = child(span_10);
        var span_11 = sibling(img_1, 2);
        var node_4 = child(span_11);
        Icon(node_4, { name: "expand", size: 15, stroke: 1.6 });
        var span_12 = sibling(span_10, 2);
        var span_13 = child(span_12);
        var span_14 = child(span_13);
        var text_6 = only_child(span_14, true);
        var span_15 = sibling(span_14, 2);
        var text_7 = only_child(span_15);
        var span_16 = sibling(span_13, 2);
        var text_8 = only_child(span_16, true);
        template_effect(
          ($0, $1) => {
            set_style(button_2, `--card-delay: ${get(index2) % 6 * 35}ms`);
            set_attribute(button_2, "aria-label", $0);
            set_attribute(img_1, "src", get(clip).src);
            set_attribute(img_1, "alt", get(clip).alt);
            set_text(text_6, get(clip).dateLabel);
            set_text(text_7, `#${$1 ?? ""}`);
            set_text(text_8, get(clip).title);
          },
          [
            () => i18n.t.gallery.cardAria(get(clip).title),
            () => formatStreamNumber(get(clip).n)
          ]
        );
        delegated("click", button_2, () => openAt(get(lightboxIndex)));
        append($$anchor3, button_2);
      });
      append($$anchor2, div_2);
    };
    var consequent_3 = ($$anchor2) => {
      var p = root_5();
      var text_9 = only_child(p, true);
      template_effect(() => set_text(text_9, i18n.t.gallery.empty));
      append($$anchor2, p);
    };
    if_block(node_3, ($$render) => {
      if (get(partitioned).gridItems.length > 0) $$render(consequent_2);
      else if (!get(partitioned).featured) $$render(consequent_3, 1);
    });
  }
  var node_5 = sibling(node_3, 2);
  {
    var consequent_4 = ($$anchor2) => {
      var div_3 = root_6();
      var button_3 = child(div_3);
      var text_10 = only_child(button_3, true);
      template_effect(
        ($0) => {
          set_attribute(button_3, "aria-expanded", get(showAll));
          set_text(text_10, $0);
        },
        [
          () => get(showAll) ? i18n.t.gallery.showLess : i18n.t.gallery.showMore(get(partitioned).remainingCount)
        ]
      );
      delegated("click", button_3, () => set(showAll, !get(showAll)));
      append($$anchor2, div_3);
    };
    if_block(node_5, ($$render) => {
      if (get(partitioned).canToggle) $$render(consequent_4);
    });
  }
  var dialog_1 = sibling(div, 2);
  var node_6 = child(dialog_1);
  {
    var consequent_7 = ($$anchor2) => {
      var figure = root_11();
      var div_4 = child(figure);
      var node_7 = child(div_4);
      key(node_7, () => get(active).id, ($$anchor3) => {
        var img_2 = root_7();
        let classes_1;
        template_effect(() => {
          classes_1 = set_class(img_2, 1, "slide svelte-ewh1ap", null, classes_1, { "slide--cover": get(fitMode) === "cover" });
          set_attribute(img_2, "src", get(active).src);
          set_attribute(img_2, "alt", get(active).alt);
        });
        append($$anchor3, img_2);
      });
      var div_5 = sibling(node_7, 2);
      var span_17 = child(div_5);
      var text_11 = only_child(span_17);
      var div_6 = sibling(span_17, 2);
      var button_4 = child(div_6);
      var text_12 = only_child(button_4, true);
      var button_5 = sibling(button_4, 2);
      var node_8 = child(button_5);
      Icon(node_8, { name: "close", size: 18, stroke: 1.7 });
      var node_9 = sibling(div_5, 2);
      {
        var consequent_5 = ($$anchor3) => {
          var div_7 = root_8();
          var button_6 = child(div_7);
          var node_10 = child(button_6);
          Icon(node_10, { name: "chevron-left", size: 18, stroke: 1.8 });
          var span_18 = sibling(button_6, 2);
          var text_13 = only_child(span_18);
          var button_7 = sibling(span_18, 2);
          var node_11 = child(button_7);
          Icon(node_11, { name: "chevron-right", size: 18, stroke: 1.8 });
          template_effect(() => {
            set_attribute(button_6, "aria-label", i18n.t.gallery.prevAria);
            set_text(text_13, `${get(current) + 1} / ${get(lightboxItems).length ?? ""}`);
            set_attribute(button_7, "aria-label", i18n.t.gallery.nextAria);
          });
          delegated("click", button_6, () => step(-1));
          delegated("click", button_7, () => step(1));
          append($$anchor3, div_7);
        };
        if_block(node_9, ($$render) => {
          if (get(lightboxItems).length > 1) $$render(consequent_5);
        });
      }
      var figcaption = sibling(div_4, 2);
      var div_8 = child(figcaption);
      var p_1 = child(div_8);
      var text_14 = only_child(p_1, true);
      var h3 = sibling(p_1, 2);
      var text_15 = only_child(h3, true);
      var a = sibling(div_8, 2);
      var span_19 = child(a);
      var text_16 = only_child(span_19, true);
      var node_12 = sibling(span_19, 2);
      Icon(node_12, { name: "external", size: 15, stroke: 1.6 });
      var node_13 = sibling(figcaption, 2);
      {
        var consequent_6 = ($$anchor3) => {
          var div_9 = root_10();
          each(div_9, 23, () => get(lightboxItems), (thumb) => thumb.id, ($$anchor4, thumb, index2) => {
            var button_8 = root_9();
            let classes_2;
            var img_3 = only_child(button_8);
            template_effect(
              ($0) => {
                classes_2 = set_class(button_8, 1, "filmstrip__item svelte-ewh1ap", null, classes_2, { "filmstrip__item--active": get(index2) === get(current) });
                set_attribute(button_8, "data-thumb-index", get(index2));
                set_attribute(button_8, "aria-label", $0);
                set_attribute(button_8, "aria-current", get(index2) === get(current) ? "true" : void 0);
                set_attribute(img_3, "src", get(thumb).src);
              },
              [
                () => i18n.t.gallery.thumbAria(get(thumb).title, get(index2) + 1)
              ]
            );
            delegated("click", button_8, () => set(current, get(index2), true));
            append($$anchor4, button_8);
          });
          bind_this(div_9, ($$value) => set(filmstripEl, $$value), () => get(filmstripEl));
          template_effect(() => set_attribute(div_9, "aria-label", i18n.t.gallery.thumbnailsAria));
          append($$anchor3, div_9);
        };
        if_block(node_13, ($$render) => {
          if (get(lightboxItems).length > 1) $$render(consequent_6);
        });
      }
      bind_this(figure, ($$value) => set(panelEl, $$value), () => get(panelEl));
      template_effect(
        ($0) => {
          set_text(text_11, `#${$0 ?? ""}`);
          set_attribute(button_4, "aria-label", i18n.t.gallery.fitToggleAria);
          set_attribute(button_4, "aria-pressed", get(fitMode) === "cover");
          set_text(text_12, get(fitMode) === "contain" ? i18n.t.gallery.fillView : i18n.t.gallery.fitView);
          set_attribute(button_5, "aria-label", i18n.t.gallery.closeAria);
          set_text(text_14, get(active).dateLabel);
          set_text(text_15, get(active).title);
          set_text(text_16, i18n.t.gallery.twitchLink);
        },
        [() => formatStreamNumber(get(active).n)]
      );
      delegated("pointerdown", div_4, handlePointerDown);
      delegated("pointerup", div_4, handlePointerUp);
      delegated("click", button_4, toggleFitMode);
      delegated("click", button_5, close);
      append($$anchor2, figure);
    };
    if_block(node_6, ($$render) => {
      if (get(active)) $$render(consequent_7);
    });
  }
  bind_this(dialog_1, ($$value) => set(dialog, $$value), () => get(dialog));
  template_effect(() => set_attribute(dialog_1, "aria-label", i18n.t.gallery.aria));
  delegated("keydown", dialog_1, handleKeydown);
  delegated("click", dialog_1, handleBackdrop);
  append($$anchor, fragment);
  pop();
}
delegate(["click", "keydown", "pointerdown", "pointerup"]);
function parallax(node, options = {}) {
  const { speed = 0.16, max = 56 } = options;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return {};
  }
  let frame = 0;
  const update = () => {
    frame = 0;
    const offset = Math.min(max, Math.max(0, window.scrollY * speed));
    node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  };
  const onScroll = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  update();
  return {
    destroy() {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    }
  };
}
const JUEGOS_CLIP_NUMBERS = [17, 14, 18, 3];
function getJuegosClipNumber(index2) {
  if (!Number.isInteger(index2) || index2 < 0 || index2 >= JUEGOS_CLIP_NUMBERS.length) {
    return JUEGOS_CLIP_NUMBERS[0];
  }
  return JUEGOS_CLIP_NUMBERS[index2];
}
const inicioUrl = "" + new URL("inicio-DGfwQ3LG.png", import.meta.url).href;
var root = /* @__PURE__ */ from_html(`<img class="juegos__img svelte-1n46o8q" loading="lazy" decoding="async"/>`);
var root_1 = /* @__PURE__ */ from_html(`<button type="button"><span class="juegos__icon svelte-1n46o8q"><!></span> <span class="juegos__body svelte-1n46o8q"><span class="juegos__title svelte-1n46o8q"> </span> <span class="juegos__text svelte-1n46o8q"> </span></span> <span class="juegos__indicator svelte-1n46o8q" aria-hidden="true"></span></button>`);
var root_2 = /* @__PURE__ */ from_html(`<li class="svelte-1n46o8q"><!> <span> </span></li>`);
var root_3 = /* @__PURE__ */ from_html(`<!> <main><section class="hero-section svelte-1n46o8q" id="top"><div class="hero svelte-1n46o8q"><img class="hero__img svelte-1n46o8q" fetchpriority="high"/> <div class="hero__veil svelte-1n46o8q"></div> <div class="hero__content svelte-1n46o8q"><h1 class="svelte-1n46o8q"> </h1> <p class="hero__sub svelte-1n46o8q"> </p> <div class="hero__cta svelte-1n46o8q"><a class="pill pill--white" target="_blank" rel="noreferrer noopener"> </a></div></div></div></section> <section class="section canal svelte-1n46o8q" id="canal"><div class="container centered"><h2> </h2> <p class="lead"> </p></div> <div class="container"><a class="media media--video canal__media svelte-1n46o8q" target="_blank" rel="noreferrer noopener"><img loading="lazy" decoding="async" class="svelte-1n46o8q"/> <span class="pill pill--glass media--on-photo canal__pill svelte-1n46o8q"><svg class="canal__play svelte-1n46o8q" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 2.2v7.6a.6.6 0 0 0 .92.5l6.1-3.8a.6.6 0 0 0 0-1L3.92 1.7A.6.6 0 0 0 3 2.2z"></path></svg> <span> </span></span></a></div> <div class="container icon-rows canal__rows svelte-1n46o8q"></div></section> <section class="section section--warm" id="galeria"><div class="container centered"><p class="eyebrow"> </p> <h2> </h2> <p class="lead"> </p></div> <div class="container galeria svelte-1n46o8q"><!></div> <div class="galeria__actions svelte-1n46o8q"><a class="pill pill--ghost" target="_blank" rel="noreferrer noopener"> </a></div></section> <section class="section juegos"><div class="container centered"><p class="eyebrow"> </p> <h2> </h2> <p class="lead"> </p></div> <div class="container juegos__stage-wrap svelte-1n46o8q"><div class="media juegos__stage svelte-1n46o8q"><!> <span class="float-pill float-pill--top juegos__badge svelte-1n46o8q"><span class="dot" aria-hidden="true"></span> <span class="juegos__badge-text svelte-1n46o8q"> </span></span> <a class="pill pill--glass media--on-photo juegos__pill svelte-1n46o8q" target="_blank" rel="noreferrer noopener"><svg class="canal__play svelte-1n46o8q" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 2.2v7.6a.6.6 0 0 0 .92.5l6.1-3.8a.6.6 0 0 0 0-1L3.92 1.7A.6.6 0 0 0 3 2.2z"></path></svg> <span> </span></a></div></div> <div class="container juegos__list svelte-1n46o8q" role="group"></div></section> <section class="section section--warm company"><div class="container centered"><p class="eyebrow"> </p> <h2> </h2> <p class="lead"> </p></div> <div class="container company__carousel svelte-1n46o8q"><!></div> <div class="container icon-rows"></div> <div class="company__actions svelte-1n46o8q"><a class="pill pill--ghost" target="_blank" rel="noreferrer noopener"><span> </span> <!></a></div></section> <section class="section cierre svelte-1n46o8q" id="horario"><div class="container centered"><p class="eyebrow"> </p> <div class="cierre__identity svelte-1n46o8q"><img class="cierre__avatar svelte-1n46o8q" alt="" width="52" height="52" loading="lazy" decoding="async"/> <h2 class="cierre__name svelte-1n46o8q"><strong class="svelte-1n46o8q">plottyplote</strong><span class="svelte-1n46o8q">666</span></h2></div> <p class="cierre__sub svelte-1n46o8q"> </p> <ul class="cierre__schedule svelte-1n46o8q"></ul> <div class="cierre__actions svelte-1n46o8q"><a class="pill pill--ghost" target="_blank" rel="noreferrer noopener"><span> </span> <!></a> <a class="pill pill--primary" target="_blank" rel="noreferrer noopener"><!> <span> </span></a></div> <p class="cierre__note svelte-1n46o8q"> </p> <a class="cierre__media svelte-1n46o8q" target="_blank" rel="noreferrer noopener"><img loading="lazy" decoding="async" class="svelte-1n46o8q"/> <span class="float-pill float-pill--center-bottom"><span class="dot" aria-hidden="true"></span> <span> </span></span></a></div></section></main> <!> <!>`, 1);
function App($$anchor, $$props) {
  push($$props, true);
  const TWITCH = "https://www.twitch.tv/plottyplote666";
  const YOUTUBE = "https://www.youtube.com/@plottyplotesiro4549";
  const heroImage = inicioUrl;
  const canalClip = /* @__PURE__ */ user_derived(() => i18n.localizeClip(clipByNumber(16)));
  let activeJuegosIndex = /* @__PURE__ */ state(0);
  const activeJuegosFeature = /* @__PURE__ */ user_derived(() => i18n.t.juegos.features[get(activeJuegosIndex)] ?? i18n.t.juegos.features[0]);
  const activeJuegosClip = /* @__PURE__ */ user_derived(() => i18n.localizeClip(clipByNumber(getJuegosClipNumber(get(activeJuegosIndex)))));
  const conversacion = /* @__PURE__ */ user_derived(() => buildCompanySlides([...[4, 7, 8].map((n) => clipByNumber(n)), extraPhotos.selfie].map((clip) => i18n.localizeClip(clip)), i18n.t.compania.chatExchanges));
  var fragment = root_3();
  var node = first_child(fragment);
  Header(node, {});
  var main = sibling(node, 2);
  var section = child(main);
  var div = child(section);
  var img = child(div);
  action(img, ($$node) => parallax == null ? void 0 : parallax($$node));
  var div_1 = sibling(img, 4);
  var h1 = child(div_1);
  var text = only_child(h1, true);
  var p = sibling(h1, 2);
  var text_1 = only_child(p, true);
  var div_2 = sibling(p, 2);
  var a = child(div_2);
  set_attribute(a, "href", TWITCH);
  var text_2 = only_child(a, true);
  var section_1 = sibling(section, 2);
  var div_3 = child(section_1);
  var h2 = child(div_3);
  var text_3 = only_child(h2, true);
  action(h2, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 70 }));
  var p_1 = sibling(h2, 2);
  var text_4 = only_child(p_1, true);
  action(p_1, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 150 }));
  var div_4 = sibling(div_3, 2);
  var a_1 = child(div_4);
  set_attribute(a_1, "href", `${TWITCH}/videos`);
  var img_1 = child(a_1);
  var span = sibling(img_1, 2);
  var span_1 = sibling(child(span), 2);
  var text_5 = only_child(span_1, true);
  action(a_1, ($$node) => reveal == null ? void 0 : reveal($$node));
  var div_5 = sibling(div_4, 2);
  each(div_5, 23, () => i18n.t.canal.features, (item) => item.icon, ($$anchor2, item, index2) => {
    {
      let $0 = /* @__PURE__ */ user_derived(() => get(index2) * 90);
      IconRow($$anchor2, spread_props(() => get(item), {
        get delay() {
          return get($0);
        }
      }));
    }
  });
  var section_2 = sibling(section_1, 2);
  var div_6 = child(section_2);
  var p_2 = child(div_6);
  var text_6 = only_child(p_2, true);
  action(p_2, ($$node) => reveal == null ? void 0 : reveal($$node));
  var h2_1 = sibling(p_2, 2);
  var text_7 = only_child(h2_1, true);
  action(h2_1, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 70 }));
  var p_3 = sibling(h2_1, 2);
  var text_8 = only_child(p_3, true);
  action(p_3, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 150 }));
  var div_7 = sibling(div_6, 2);
  var node_1 = child(div_7);
  Gallery(node_1, {
    get items() {
      return clips;
    }
  });
  var div_8 = sibling(div_7, 2);
  var a_2 = child(div_8);
  set_attribute(a_2, "href", `${TWITCH}/videos`);
  var text_9 = only_child(a_2, true);
  var section_3 = sibling(section_2, 2);
  var div_9 = child(section_3);
  var p_4 = child(div_9);
  var text_10 = only_child(p_4, true);
  action(p_4, ($$node) => reveal == null ? void 0 : reveal($$node));
  var h2_2 = sibling(p_4, 2);
  var text_11 = only_child(h2_2, true);
  action(h2_2, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 70 }));
  var p_5 = sibling(h2_2, 2);
  var text_12 = only_child(p_5, true);
  action(p_5, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 130 }));
  var div_10 = sibling(div_9, 2);
  var div_11 = child(div_10);
  var node_2 = child(div_11);
  key(node_2, () => get(activeJuegosClip).id, ($$anchor2) => {
    var img_2 = root();
    template_effect(() => {
      set_attribute(img_2, "src", get(activeJuegosClip).src);
      set_attribute(img_2, "alt", get(activeJuegosClip).alt);
    });
    append($$anchor2, img_2);
  });
  var span_2 = sibling(node_2, 2);
  var span_3 = sibling(child(span_2), 2);
  var text_13 = only_child(span_3, true);
  var a_3 = sibling(span_2, 2);
  set_attribute(a_3, "href", `${TWITCH}/clips`);
  var span_4 = sibling(child(a_3), 2);
  var text_14 = only_child(span_4, true);
  action(div_11, ($$node) => reveal == null ? void 0 : reveal($$node));
  var div_12 = sibling(div_10, 2);
  each(div_12, 23, () => i18n.t.juegos.features, (item) => item.icon, ($$anchor2, item, index2) => {
    var button = root_1();
    let classes;
    var span_5 = child(button);
    var node_3 = child(span_5);
    Icon(node_3, {
      get name() {
        return get(item).icon;
      },
      size: 32,
      stroke: 1.5
    });
    var span_6 = sibling(span_5, 2);
    var span_7 = child(span_6);
    var text_15 = only_child(span_7, true);
    var span_8 = sibling(span_7, 2);
    var text_16 = only_child(span_8, true);
    template_effect(() => {
      classes = set_class(button, 1, "juegos__item svelte-1n46o8q", null, classes, {
        "juegos__item--active": get(activeJuegosIndex) === get(index2)
      });
      set_attribute(button, "aria-pressed", get(activeJuegosIndex) === get(index2));
      set_text(text_15, get(item).title);
      set_text(text_16, get(item).text);
    });
    delegated("click", button, () => set(activeJuegosIndex, get(index2), true));
    append($$anchor2, button);
  });
  action(div_12, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 90 }));
  var section_4 = sibling(section_3, 2);
  var div_13 = child(section_4);
  var p_6 = child(div_13);
  var text_17 = only_child(p_6, true);
  action(p_6, ($$node) => reveal == null ? void 0 : reveal($$node));
  var h2_3 = sibling(p_6, 2);
  var text_18 = only_child(h2_3, true);
  action(h2_3, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 70 }));
  var p_7 = sibling(h2_3, 2);
  var text_19 = only_child(p_7, true);
  action(p_7, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 150 }));
  var div_14 = sibling(div_13, 2);
  var node_4 = child(div_14);
  CompanyCarousel(node_4, {
    get items() {
      return get(conversacion);
    },
    get ariaLabel() {
      return i18n.t.compania.carouselAria;
    }
  });
  action(div_14, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 120 }));
  var div_15 = sibling(div_14, 2);
  each(div_15, 23, () => i18n.t.compania.features, (item) => item.icon, ($$anchor2, item, index2) => {
    {
      let $0 = /* @__PURE__ */ user_derived(() => get(index2) * 90);
      IconRow($$anchor2, spread_props(() => get(item), {
        get delay() {
          return get($0);
        }
      }));
    }
  });
  var div_16 = sibling(div_15, 2);
  var a_4 = child(div_16);
  set_attribute(a_4, "href", `${TWITCH}/chat`);
  var span_9 = child(a_4);
  var text_20 = only_child(span_9, true);
  var node_5 = sibling(span_9, 2);
  Icon(node_5, { name: "external", size: 15, stroke: 1.6 });
  action(div_16, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 160 }));
  var section_5 = sibling(section_4, 2);
  var div_17 = child(section_5);
  var p_8 = child(div_17);
  var text_21 = only_child(p_8, true);
  action(p_8, ($$node) => reveal == null ? void 0 : reveal($$node));
  var div_18 = sibling(p_8, 2);
  var img_3 = child(div_18);
  action(div_18, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 60 }));
  var p_9 = sibling(div_18, 2);
  var text_22 = only_child(p_9, true);
  action(p_9, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 110 }));
  var ul = sibling(p_9, 2);
  each(ul, 21, () => i18n.t.cierre.schedule, (item) => item.icon, ($$anchor2, item) => {
    var li = root_2();
    var node_6 = child(li);
    Icon(node_6, {
      get name() {
        return get(item).icon;
      },
      size: 17,
      stroke: 1.6
    });
    var span_10 = sibling(node_6, 2);
    var text_23 = only_child(span_10, true);
    template_effect(() => set_text(text_23, get(item).text));
    append($$anchor2, li);
  });
  action(ul, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 150 }));
  var div_19 = sibling(ul, 2);
  var a_5 = child(div_19);
  set_attribute(a_5, "href", YOUTUBE);
  var span_11 = child(a_5);
  var text_24 = only_child(span_11, true);
  var node_7 = sibling(span_11, 2);
  Icon(node_7, { name: "external", size: 15, stroke: 1.6 });
  var a_6 = sibling(a_5, 2);
  set_attribute(a_6, "href", TWITCH);
  var node_8 = child(a_6);
  Icon(node_8, { name: "play", size: 16, stroke: 1.7 });
  var span_12 = sibling(node_8, 2);
  var text_25 = only_child(span_12, true);
  action(div_19, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 190 }));
  var p_10 = sibling(div_19, 2);
  var text_26 = only_child(p_10, true);
  action(p_10, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 220 }));
  var a_7 = sibling(p_10, 2);
  set_attribute(a_7, "href", TWITCH);
  var img_4 = child(a_7);
  var span_13 = sibling(img_4, 2);
  var span_14 = sibling(child(span_13), 2);
  var text_27 = only_child(span_14, true);
  action(a_7, ($$node, $$action_arg) => reveal == null ? void 0 : reveal($$node, $$action_arg), () => ({ delay: 140, distance: 24 }));
  var node_9 = sibling(main, 2);
  Footer(node_9, {});
  var node_10 = sibling(node_9, 2);
  MusicToggle(node_10, {});
  template_effect(
    ($0) => {
      set_attribute(img, "src", heroImage);
      set_attribute(img, "alt", i18n.t.hero.alt);
      set_text(text, i18n.t.hero.title);
      set_text(text_1, i18n.t.hero.sub);
      set_text(text_2, i18n.t.hero.cta);
      set_text(text_3, i18n.t.canal.title);
      set_text(text_4, i18n.t.canal.lead);
      set_attribute(img_1, "src", get(canalClip).src);
      set_attribute(img_1, "alt", get(canalClip).alt);
      set_text(text_5, $0);
      set_text(text_6, i18n.t.gallery.eyebrow);
      set_text(text_7, i18n.t.gallery.title);
      set_text(text_8, i18n.t.gallery.lead);
      set_text(text_9, i18n.t.gallery.action);
      set_text(text_10, i18n.t.juegos.eyebrow);
      set_text(text_11, i18n.t.juegos.title);
      set_text(text_12, i18n.t.juegos.lead);
      set_text(text_13, get(activeJuegosFeature).title);
      set_text(text_14, i18n.t.juegos.watchClips);
      set_attribute(div_12, "aria-label", i18n.t.juegos.categoryGroupAria);
      set_text(text_17, i18n.t.compania.eyebrow);
      set_text(text_18, i18n.t.compania.title);
      set_text(text_19, i18n.t.compania.lead);
      set_text(text_20, i18n.t.compania.chatCta);
      set_text(text_21, i18n.t.cierre.eyebrow);
      set_attribute(img_3, "src", logo);
      set_text(text_22, i18n.t.cierre.sub);
      set_text(text_24, i18n.t.cierre.youtube);
      set_text(text_25, i18n.t.cierre.twitch);
      set_text(text_26, i18n.t.cierre.note);
      set_attribute(a_7, "aria-label", i18n.t.cierre.twitch);
      set_attribute(img_4, "src", extraPhotos.selfie.src);
      set_attribute(img_4, "alt", i18n.t.cierre.portraitAlt);
      set_text(text_27, i18n.t.cierre.livePill);
    },
    [() => i18n.t.canal.watchLatest.replace(/^▶\s*/, "")]
  );
  append($$anchor, fragment);
  pop();
}
delegate(["click"]);
mount(App, { target: document.getElementById("app") });
