import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IForm } from "../../../../modules/auth/types";
import "../styles/login.scss";
import * as yup from "yup";
import { Input } from "../../../../components";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Необходимо указать имя пользователя")
    .min(6, "Имя пользователя должно быть не менее 6 символов")
    .max(25, "Имя пользователя должно содержать не более 25 символов"),
  password: yup
    .string()
    .required("Необходимо ввести пароль")
    .min(6, "Пароль должен быть не менее 6 символов")
    .max(30, "Пароль должен содержать не более 30 символов"),
});

interface LoginState {
  values: IForm.ILogin;
  errors: Partial<Record<keyof IForm.ILogin, string>>;
}

interface LoginProps {}

export default class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    values: { username: "", password: "" },
    errors: {},
  };

  validate = async (values: IForm.ILogin) => {
    const errors: Partial<Record<keyof IForm.ILogin, string>> = {};

    try {
      await schema.validate(values, { abortEarly: false });
      return null;
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        for (const { path = "", message } of error.inner) {
          errors[path as keyof IForm.ILogin] = message;
        }
      }
      return errors;
    }
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const errors = await this.validate(this.state.values);

    if (errors) {
      this.setState({ errors });
      return;
    }

    console.log("values = ", this.state.values);
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target,
  }) => {
    const { name, value } = target;
    this.setState(
      (prevState) => ({
        values: {
          ...prevState.values,
          [name]: value,
        },
      }),
      async () => {
        const errors = await this.validate(this.state.values);
        if (errors) {
          this.setState({ errors });
        } else {
          this.setState({ errors: { ...this.state.errors, [name]: "" } });
        }
      }
    );
  };

  renderInput = (
    name: keyof IForm.ILogin,
    type: React.HTMLInputTypeAttribute = "text",
    placeholder: string
  ) => {
    return (
      <Input
        name={name}
        type={type}
        value={this.state.values[name]}
        onChange={this.handleChange}
        placeholder={placeholder}
        error={this.state.errors[name]}
      />
    );
  };

  render() {
    return (
      <main>
        <div className="auth-container">
          <div className="auth-header">
            <div className="auth-text">С возвращением!</div>
            <div className="auth-second-text">
              Лучший сайт для просмотра аниме онлайн, совершенно бесплатно!
            </div>
          </div>
          <div className="auth-body">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "text", "Username")}
              {this.renderInput("password", "password", "Password")}
              <button className="auth-submit-btn">ВОЙТИ</button>
              <div className="auth-go-to">
                У вас нет учетной записи?{" "}
                <span>
                  <Link to={"/auth/register"}>Зарегистрироваться</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
