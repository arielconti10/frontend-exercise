import { Modal } from "./modal";
import PlanetDetail from "@/app/planet/[id]/planetDetail";

export default function PlanetModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <PlanetDetail id={id} />
    </Modal>
  );
}
