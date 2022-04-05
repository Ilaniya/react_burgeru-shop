import React from "react";
import Header from "./Header";
import Order from "./Order";
import Burger from "./Burger";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import base from "../base";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import SignIn from "./Auth/SignIn";

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object,
  };

  state = {
    burgers: {},
    order: {},
  };

  componentDidMount() {
    const localStorageRef = localStorage.getItem(
      this.props.match.params.restaurantId
    );
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(
      `${this.props.match.params.restaurantId}/burgers`,
      {
        context: this,
        state: "burgers",
      }
    );
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.restaurantId,
      JSON.stringify(this.state.order)
    );
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addBurger = (burger) => {
    // 1.делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // 2.добавить новый бургер в переменную burgers
    burgers[`burger${Date.now()}`] = burger;
    // 3.записать наш новый объект burgers в state
    this.setState({ burgers });
  };

  updateBurger = (key, updatedBurger) => {
    // делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // обновляем нужный бургер
    burgers[key] = updatedBurger;
    // записываем наш новый объект burgers в state
    this.setState({ burgers });
  };

  deleteBurger = (key) => {
    // делаем копию объекта state
    const burgers = { ...this.state.burgers };
    // удаляем нужный бургер
    burgers[key] = null;
    // записываем наш обновленный объект burgers в state
    this.setState({ burgers });
  };

  deleteFromOrder = (key) => {
    // делаем копию объекта state
    const order = { ...this.state.order };
    // удаляем нужный бургер из заказа
    delete order[key];
    // записываем наш обновленный объект burgers в state
    this.setState({ order });
  };

  loadSampleBurgers = () => {
    this.setState({ burgers: sampleBurgers }); // что хотим обновить: на что хотим обновить
  };

  addToOrder = (key) => {
    //1. делаем копию объекта "state"
    const order = { ...this.state.order };
    //2. добавляем 1 если бургер уже есть в заказе, или проставляем 1, если бергер первый
    order[key] = order[key] + 1 || 1;
    //3. добавляем обновленный state в оригинальный state в app
    this.setState({ order });
  };

  handleLogout = async () => {
    await firebase.auth().signOut();
    window.location.reload();
  };

  render() {
    return (
      <SignIn>
        <div className='burger-paradise'>
          <div className='menu'>
            <Header title='Very Hot Burger' />
            <ul className='burgers'>
              {Object.keys(this.state.burgers).map((key) => {
                return (
                  <Burger
                    key={key}
                    index={key}
                    addToOrder={this.addToOrder}
                    details={this.state.burgers[key]}
                  />
                );
              })}
            </ul>
          </div>
          <Order
            burgers={this.state.burgers}
            order={this.state.order}
            deleteFromOrder={this.deleteFromOrder}
          />
          <MenuAdmin
            addBurger={this.addBurger}
            updateBurger={this.updateBurger}
            loadSampleBurgers={this.loadSampleBurgers}
            burgers={this.state.burgers}
            deleteBurger={this.deleteBurger}
            handleLogout={this.handleLogout}
          />
        </div>
      </SignIn>
    );
  }
}

export default App;
