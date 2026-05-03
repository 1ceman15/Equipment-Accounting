import * as React from 'react';

const Buttons: React.SFC = props => {
  return (
    <div className="row">
      <div className="col-md-12 text-center" style={{ marginTop: '30px' }}>
        <button className="btn btn-primary" style={{ margin: '10px' }} onClick={props.login}>
          Войти
        </button>
        <button className="btn btn-warning" style={{ margin: '10px' }} onClick={props.callApi}>
          Call Backend
        </button>
        <button className="btn btn-dark" style={{ margin: '10px' }} onClick={props.logout}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Buttons;
