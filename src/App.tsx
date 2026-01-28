import  { useState, useRef } from 'react';
import { ParamEditor } from './components/ParamEditor';
import type { Param, Model } from './types';
import styles from './styles.module.css';

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
  const [savedModels, setSavedModels] = useState<Model[]>([]);
  const paramEditorRef = useRef<ParamEditor>(null);

  const handleSave = () => {
    if (paramEditorRef.current) {
      const updatedModel = paramEditorRef.current.getModel();
      setModel(updatedModel);
      setSavedModels(prev => [updatedModel, ...prev.slice(0, 4)]);
      
      console.log('Сохраненная модель:', updatedModel);
    }
  };

  const handleReset = () => {
    setModel(initialModel);
  };

  const handleAddParam = () => {
    const newParam: Param = {
      id: params.length + 1,
      name: `Параметр ${params.length + 1}`,
      type: 'string'
    };
    
    params.push(newParam);
    console.log('Новый параметр добавлен:', newParam);
  };

  return (
    <div className={styles.app}>
      <header className={styles.app_header}>
        <h1>Редактор параметров товара</h1>
        <p>Редактируйте параметры и сохраняйте изменения</p>
      </header>

      <main className={styles.app_main}>
        <div className={styles.app_container}>
          <div className={styles.app_info}>
            <div className={styles.info_section}>
              <h2>Параметры ({params.length})</h2>
              <ul className={styles.params_list}>
                {params.map(param => (
                  <li key={param.id} className={styles.params_list_item}>
                    <span className={styles.param_id}>{param.id}</span>
                    <span className={styles.param_name}>{param.name}</span>
                    <span className={styles.param_type}>{param.type}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.info_section}>
              <h2>Исходная модель</h2>
              <pre className={styles.model_preview}>
                {JSON.stringify(initialModel, null, 2)}
              </pre>
            </div>
          </div>

          <div className={styles.app_editor}>
            <div className={styles.editor_header}>
              <h2>Редактор</h2>
              <div className={styles.editor_actions}>
                <button 
                  className={`${styles.btn} ${styles.btn_primary}`}
                  onClick={handleSave}
                >
                  Сохранить модель
                </button>
                <button 
                  className={`${styles.btn} ${styles.btn_secondary}`}
                  onClick={handleReset}
                >
                  Сбросить
                </button>
                <button 
                  className={`${styles.btn} ${styles.btn_outline}`}
                  onClick={handleAddParam}
                >
                  + Добавить параметр
                </button>
              </div>
            </div>

            <ParamEditor
              ref={paramEditorRef}
              params={params}
              model={model}
            />

            {savedModels.length > 0 && (
              <div className={styles.saved_models}>
                <h3>История сохранений</h3>
                <div className={styles.models_grid}>
                  {savedModels.map((savedModel, index) => (
                    <div key={index} className={styles.model_card}>
                      <div className={styles.model_card_header}>
                        <span>Сохранено {savedModels.length - index}</span>
                        <small>{new Date().toLocaleTimeString()}</small>
                      </div>
                      <pre className={styles.model_card_content}>
                        {JSON.stringify(savedModel.paramValues, null, 1)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;