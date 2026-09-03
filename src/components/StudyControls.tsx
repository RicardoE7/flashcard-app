import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { NeonButton } from "./NeonButton";

interface StudyControlsProps {
  disabled: boolean;
  onPrevious: () => void;
  onFlip: () => void;
  onNext: () => void;
}

export function StudyControls({
  disabled,
  onPrevious,
  onFlip,
  onNext,
}: StudyControlsProps) {
  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-3 gap-2">
      <NeonButton onClick={onPrevious} disabled={disabled}>
        <span className="flex items-center justify-center gap-2">
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">PREV</span>
        </span>
      </NeonButton>
      <NeonButton variant="primary" onClick={onFlip} disabled={disabled}>
        <span className="flex items-center justify-center gap-2">
          <RefreshCw size={16} /> FLIP
        </span>
      </NeonButton>
      <NeonButton onClick={onNext} disabled={disabled}>
        <span className="flex items-center justify-center gap-2">
          <span className="hidden sm:inline">NEXT</span>
          <ArrowRight size={16} />
        </span>
      </NeonButton>
    </div>
  );
}
