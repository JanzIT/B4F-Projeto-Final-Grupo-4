import React from "react";
import { Card, CardBody, CircularProgress, Chip } from "@nextui-org/react";

const ScoreAcquiredSkills = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-md border-none rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 mb-6 p-4">
        <CardBody className="flex flex-col items-center justify-center">
          <CircularProgress
            classNames={{
              svg: "w-48 h-48",
              indicator: "stroke-white",
              track: "stroke-white/10",
              value: "text-4xl font-bold text-white",
            }}
            value={61}
            strokeWidth={2}
            showValueLabel={true}
            aria-label="Acquired skills progress: 60%"
            transitionDuration={10000} // Definindo a duração da animação em milissegundos (aqui, 2000ms = 2 segundos)
          />
          <Chip
            classNames={{
              base: "border-1 border-white/30",
              content: "text-white/90 text-small font-semibold",
            }}
            variant="bordered"
          >
            Acquired Skills
          </Chip>

          {/* Divider and additional stats */}

          <div className="w-full mt-10 p-4">
            <div className="flex justify-between items-center text-white mb-2">
              <span>Challenge Resolution</span>
              <span>72%</span>
            </div>
            <hr className="border-white mb-4"></hr>
            <div className="flex justify-between items-center text-white mb-2">
              <span>Practical Certifications</span>
              <span>23%</span>
            </div>
            <hr className="border-white mb-4"></hr>
            <div className="flex justify-between items-center text-white mb-2">
              <span>Learning Hours Dedicated</span>
              <span>38h</span>
            </div>
            <hr className="border-white mb-4"></hr>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ScoreAcquiredSkills;