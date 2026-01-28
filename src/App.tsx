

import { useRef, useState } from 'react';
import { ParamEditor } from './components/ParamEditor'
import type { Param, Model } from './types';
import styles from './styles.module.css'
function App() {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
    { id: 3, name: "Материал", type: "string" },
    { id: 4, name: "Сезон", type: "string" },
  ];

  const initialModel: Model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
      { paramId: 4, value: "лето" },
    ],
    colors: [
      { id: 1, name: "Красный" },
      { id: 2, name: "Синий" },
      { id: 3, name: "Зеленый" },
    ]
  };
  const [model, setModel] = useState<Model>(initialModel);
    const paramEditorRef = useRef<ParamEditor>(null);
  return (
    <div className={styles.app}>
      <ParamEditor
          ref={paramEditorRef}
          params={params}
          model={model}
      />
    </div>
  )
}

export default App
