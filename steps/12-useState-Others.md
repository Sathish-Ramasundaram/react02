const [value, setValue] = useState(initialValue);

setValue(prev => prev + 1);

Visual Timeline:
Render 1 → count = 0
click → setCount(1)
Render 2 → count = 1
click → setCount(2)
Render 3 → count = 2

------------------

For other concepts -- See TAL_REACT