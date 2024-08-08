import { Modal } from "./modal";
import PlanetDetail from "@/components/planetDetail";

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
