import React, { useState } from 'react';
import styled from '@emotion/styled';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .MyWrap {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    padding: 5px;
    gap: 5px;
    width: max-content;
    font-family: sans-serif;

    .string {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .label {
        margin: 0 auto;
        font-size: 1rem;
        padding-right: 0.2rem;
      }
    }

    .btn {
      padding: 0.3rem 0.8rem;
      background: none;
      color: green;
      border: 1px solid green;
      transition: all ease 0.8s;
      cursor: pointer;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: bold;

      &:hover {
        box-shadow: 0 0 0.5rem 0.4rem rgba(0, 128, 128, 0.29);
        background-color: green;
        color: white;
      }
    }
  }
`;

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
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
};

interface TextParamProps {
  paramId: number;
  value: string;
  onChange: (paramId: number, value: string) => void;
}

const TextParam: React.FC<TextParamProps> = ({ paramId, value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(paramId, e.target.value)}
    />
  );
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

  const renderParam = (param: Param) => {
    if (param.type === 'string') {
      return (
        <div key={param.id} className="string">
          <label className="label">{param.name}</label>
          <TextParam
            key={param.id}
            paramId={param.id}
            value={
              paramValues.find((paramValue) => paramValue.paramId === param.id)
                ?.value || ''
            }
            onChange={handleParamChange}
          />
        </div>
      );
    }

    // other types of parameters

    return null;
  };

  return (
    <div className="MyWrap">
      {params && params.map(renderParam)}
      <button className="btn" onClick={() => console.log(getModel())}>
        Получить модель
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Wrap>
      <ParamEditor params={params} model={model} />
    </Wrap>
  );
};

export default App;
