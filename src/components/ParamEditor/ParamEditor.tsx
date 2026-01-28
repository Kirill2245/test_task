import React from 'react';
import type { Props, State, Model } from '../../types';
import { getParamInputComponent } from '../../factories/paramInputFactory';
import { initializeParamValues, convertMapToModel } from '../../utils/modelUtils';
import styles from './styles.module.css'

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: initializeParamValues(props.params, props.model)
    };
  }

  private handleParamChange = (paramId: number, value: string) => {
    this.setState(prevState => {
      const newParamValues = new Map(prevState.paramValues);
      newParamValues.set(paramId, value);
      return { paramValues: newParamValues };
    });
  };

  public getModel(): Model {
    return convertMapToModel(
      this.state.paramValues,
      this.props.params,
      this.props.model.colors
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.params !== this.props.params || 
      prevProps.model !== this.props.model
    ) {
      this.setState({
        paramValues: initializeParamValues(this.props.params, this.props.model)
      });
    }
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div 
        className={styles.param_editor} 
        data-testid="param-editor"
      >
        <h2 className={styles.param_editor__title}>Редактор параметров</h2>
        
        <div className={styles.param_editor__form}>
          {params.map(param => {
            const ParamComponent = getParamInputComponent(param.type);
            const value = paramValues.get(param.id) || '';
            
            return (
              <ParamComponent
                key={param.id}
                param={param}
                value={value}
                onChange={this.handleParamChange}
              />
            );
          })}
        </div>
        
        <div className={styles.param_editor__preview}>
          <h3 className={styles.param_editor__preview_title}>
            Текущее состояние модели:
          </h3>
          <pre className={styles.param_editor__preview_content}>
            {JSON.stringify(this.getModel(), null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}