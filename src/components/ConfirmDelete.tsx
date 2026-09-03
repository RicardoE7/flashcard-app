import { NeonButton } from "./NeonButton";

interface ConfirmDeleteProps {
  subject: string;
  detail: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDelete({
  subject,
  detail,
  onConfirm,
  onCancel,
}: ConfirmDeleteProps) {
  return (
    <div>
      <p className="leading-7 text-slate-300">
        Delete <strong className="text-white">{subject}</strong>?
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
      <div className="mt-6 flex justify-end gap-2">
        <NeonButton onClick={onCancel}>CANCEL</NeonButton>
        <NeonButton variant="danger" onClick={onConfirm}>
          DELETE
        </NeonButton>
      </div>
    </div>
  );
}
