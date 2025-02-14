interface ServiceAvailedProps {
  name: string;
  onSelect: (service: string, checked: boolean) => void;
  className?: string;
  servedBy: string | null;
  checkedBy: string | null; // Add this prop
  currentUser: string; // Add this prop
}

export default function ServiceAvailed({
  name,
  onSelect,
  className,
  servedBy,
  checkedBy,
  currentUser,
}: ServiceAvailedProps) {
  const isChecked = checkedBy !== null; // Checkbox is checked if checkedBy is not null
  const isDisabled = checkedBy !== null && checkedBy !== currentUser; // Disable if checked by another user

  return (
    <div
      className={`flex p-2 py-4 rounded-md my-2 text-white bg-[#2E2A2A] cursor-pointer ${
        className || ""
      }`}
    >
      <div className="w-[20%] flex justify-center items-center">
        <input
          type="checkbox"
          className="size-6"
          id={name}
          checked={isChecked}
          disabled={isDisabled}
          onChange={(e) => onSelect(name, e.target.checked)}
        />
      </div>
      <div className="w-[60%] flex items-center font-bold tracking-widest">
        <label htmlFor={name}>{name}</label>
      </div>
      <div className="w-[20%] flex justify-center items-center flex-col relative">
        <p className="text-sm">served by:</p>
        <p className="font-bold">{servedBy ? servedBy : "None"}</p>
      </div>
    </div>
  );
}
