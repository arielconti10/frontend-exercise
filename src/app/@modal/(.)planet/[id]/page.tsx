import Planet from "@/app/planet/[id]/page";
import { Modal } from "./modal";

export default function PhotoModal({
  params: { id: planetId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <Planet params={{ id: planetId }} />
    </Modal>
  );
}
