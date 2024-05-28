import React from "react";
import { Card, CardBody, CircularProgress, Chip } from "@nextui-org/react";

const ScoreAcquiredSkills = () => {
  return (
    <Card className="w-[240px] h-[240px] border-none rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600">
      <CardBody className="flex flex-col items-center justify-center">
        {/* CircularProgress aumentado e com stroke mais fino */}
        <CircularProgress
          classNames={{
            svg: "w-32 h-32", // Aumente o tamanho do círculo
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-4xl font-bold text-white", // Ajuste o tamanho do valor
          }}
          value={60} // Valor de exemplo (60%)
          strokeWidth={2} // Torne o stroke mais fino
          showValueLabel={true}
          aria-label="Acquired skills progress: 60%" // necessário para não dar erro
        />
        {/* Exemplo de Chip */}
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          Acquired Skills
        </Chip>
      </CardBody>
    </Card>
  );
};

export default ScoreAcquiredSkills;
