================================================================
CLEAN CODE - QUICK REFERENCE
================================================================
Keep this open while you work.
If you only remember three things:

1. Write names the next person can read.
2. Keep functions small.
3. Don't repeat yourself.
   Priority when rules clash:
   Make it work -> Make it readable -> Make it well-structured.
   ================================================================
4. # NAMES
   A good name tells you WHAT and WHY without a comment.
   BAD:
   const [data, setData] = useState(null);
   const [flag, setFlag] = useState(false);
   GOOD:
   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
   const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);
   Rules:

- Functions are verbs: getProducts, submitOrder, isLoading.
- Booleans start with: is / has / should.
- No magic numbers. Give them a name:
  BAD: if (day > 5)
  GOOD: if (day > WORK_DAYS_PER_WEEK)
- Pick one word per concept. Don't mix get / fetch / retrieve
  for the same thing across the codebase.
- # No types inside names (strName, IProduct). The IDE shows the type.

2. # FUNCTIONS
   Small. One job. Few arguments.

- Aim for ~20 lines or less.
- A function should do ONE thing. If it does several,
  those are separate functions it calls.
  BAD - does everything:
  async function submitOrder(form) {
  // validate... format... call API... toast... redirect... log...
  }
  GOOD - each step has a name:
  async function submitOrder(form: OrderForm) {
  const data = validateOrder(form);
  const payload = formatOrder(data);
  await createOrder(payload);
  notifyOrderPlaced();
  redirectToConfirmation();
  }
  No boolean flag arguments. A flag means the function does two things - split it.
  BAD: renderItem(item, true)
  GOOD: renderActiveItem(item);
  renderInactiveItem(item);
  More rules:
- Prefer one object argument over many positional ones.
- A function either ANSWERS a question or DOES an action. Never both.
- # No hidden side effects. addProduct only adds a product.

3. # DRY (DON'T REPEAT YOURSELF)
   Copy-paste is the #1 source of bugs. If you're copying:

- Repeated JSX -> reusable component
- Repeated logic -> utility function
- Repeated useEffect /
  state logic -> custom hook
  Workflow: make it work first, then refactor.
  ================================================================

4. # COMMENTS
   Default: don't write one. A good name is better.
   AVOID:

- Comments that just restate the code.
- Commented-out code (git has the history).
- "Fixed a bug here" diary entries.
- JSDoc on every function.
  OK TO USE:
- Section headers over a GROUP of lines (// State, // Effects).
- // WARNING: or // TODO: with real context.
- # Explaining a non-obvious WHY, not WHAT.

5.  # COMPONENT STRUCTURE

    Declare things in this order inside a component, with section
    comments above each group.
    Order:
    Translation -> Navigation -> State -> Ref -> Context -> Query
    -> Mutation -> Custom hooks -> Form -> Variables -> Functions
    -> Effects
    Example:
    function ProductCard({ id }: { id: string }) {
    // Translation
    const t = useTranslations("ProductCard");
    // Navigation
    const router = useRouter();

        // State
        const [isOpen, setIsOpen] = useState(false);

        // Ref
        const cardRef = useRef<HTMLDivElement>(null);

        // Context
        const { currency } = useContext(StoreContext);

        // Query
        const { data: product } = useSuspenseQuery(productQuery(id));

        // Mutation
        const { mutate: addToCart } = useMutation({ mutationFn: addToCartAction });

        // Custom hooks
        const { isFavorite, toggleFavorite } = useFavorite(id);

        // Form
        const form = useForm({ resolver: zodResolver(reviewSchema) });

        // Variables (derived)
        const formattedPrice = formatPrice(product.price, currency);

        // Functions (handlers)
        const handleAddToCart = () => addToCart(id);

        // Effects (rare, last)
        useEffect(() => { /* ... */ }, []);
        return /* ... */;

    # }

6.  # REACT RULES OF THUMB
    DERIVE, DON'T DUPLICATE.
    If you can compute it, don't store it.
    BAD:
    const [items, setItems] = useState([]);
    const [itemCount, setItemCount] = useState(0);
    GOOD:
    const [items, setItems] = useState([]);
    const itemCount = items.length;
    DON'T PUT PROPS IN STATE.
    Use the prop directly, or derive from it.
    useEffect SHOULD BE RARE.
    If it just syncs derived state, compute it in render instead.
    USE THE RIGHT TOOL:

- Multiple state pieces change together -> useReducer
- useMemo / useCallback / memo -> only when needed,
  not by reflex
- Values not depending on props/state -> declare OUTSIDE
  the component
  OTHER:
- Use <>...</> instead of a wrapper <div> when no element is needed.
- # Don't reach for context when local state works.

7. # ERRORS & TYPES

- Use async/await, not .then() chains.
- Handle errors in ONE shared place, not a try/catch in
  every component.
- Show the user a message they understand. Never a raw error.
- Use optional chaining (a?.b?.c) for possibly-missing values.
- Never use `any`. Type from the API response, or use `unknown`
  and narrow.
  ================================================================

8. # CSS & HTML

- One styling approach per project (Tailwind OR CSS modules,
  not both).
- Flexbox vs Grid:
  Flexbox -> when content shapes the layout
  (navbar, row of items)
  Grid -> when layout shapes the content
  (page templates, card grids)
- Avoid !important. Fix the specificity instead.
- Use semantic HTML: <button>, <nav>, <section>.
  Not <div> for everything.
- Prefer min() / max() / clamp() / auto-fit over piles of
  media queries.
  ================================================================

9. # PROJECT STACK RULES
   NEXT.JS (App Router, v16):

- Middleware file is `proxy.ts` (not middleware.ts).
- Server components by default. Push 'use client' down to the
  smallest interactive leaf. Never on a whole page.
  TYPESCRIPT:
- Strict mode. No `any`.
  TAILWIND v4:
- Use semantic tokens: bg-primary, text-destructive, border-ring.
  Never raw hex.
- Reusable components are w-full, sized by the parent.
  No baked-in widths like w-82.
  SHADCN/UI:
- Use it for primitives.
  NEXT-INTL (i18n):
- Locales: /en and /ar. Flat message keys.
- Never hardcode user-facing strings.
- For RTL, use logical properties: ps-, pe-, ms-, me-,
  inset-s-0. Not left / right.
  FORMS:
- React Hook Form + Zod. One schema, shared resolver,
  no manual validation state.
  SERVER STATE:
- React Query. Gate devtools behind
- process.env.NODE_ENV === "development".
  STRUCTURE:
- Feature-based folders under src/shared/.
- Kebab-case route folders.
- One alias: @/ -> src/.
  ACCESSIBILITY:
- <label> linked to each input.
- aria-label on icon-only buttons.
- Visible focus-visible states.
- # aria-invalid + aria-describedby on error fields.
  # SELF-CHECK BEFORE YOU PUSH
  [ ] Can someone read my names and know what they do?
  [ ] Is each function doing ONE thing?
  [ ] Did I copy-paste anything that should be a
  component / hook / util?
  [ ] Any `any` in my types?
  [ ] Any hardcoded strings that should be in the i18n messages?
  [ ] Any raw colors instead of semantic tokens?
  [ ] Any useEffect I could replace with a derived value?
  [ ] Did I leave commented-out code or console.logs?
  ================================================================
  Code is read ~10x more than it's written.
  Write it for the next person.
