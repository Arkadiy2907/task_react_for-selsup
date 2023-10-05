import React, { useState } from "react";

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const params = [
  {
    id: 1,
    name: "Назначение",
    type: "string",
  },
  {
    id: 2,
    name: "Длина",
    type: "string",
  },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState(model.paramValues);

  const handleParamChange = (paramId: number, value: string) => {
    const updatedParamValues = paramValues.map((paramValue) => {
      if (paramValue.paramId === paramId) {
        return { ...paramValue, value };
      }
      return paramValue;
    });
    setParamValues(updatedParamValues);
  };

  const getModel = (): Model => {
    return { paramValues };
  };

  return (
    <div>
      {params &&
        params.map((param) => (
          <div key={param.id}>
            <label>{param.name}</label>
            <input
              type="text"
              value={
                paramValues.find(
                  (paramValue) => paramValue.paramId === param.id
                )?.value || ""
              }
              onChange={(e) => handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))}
      <button onClick={() => console.log(getModel())}>Получить модель</button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <ParamEditor params={params} model={model} />
    </div>
  );
};

export default App;
