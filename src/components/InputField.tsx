type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
};

function InputField({ label, value, onChange, type = "text" }: Props) {
  return (
    <div className="mb-3">
      <label className="block mb-1 text-sm">{label}</label>

      <input
        type={type}
        className="w-full border px-3 py-2 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default InputField;
