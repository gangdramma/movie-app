import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IForm } from "../../../../modules/auth/types";
import "../styles/register.scss";
import * as yup from "yup";
import { Input } from "../../../../components";

const schema = yup.object().shape({
  username: yup.string().required().min(6).max(25),
  password: yup.string().required().min(6).max(30),
  gmail: yup.string().required().email(),
});

interface RegisterState {
  values: IForm.IRegister;
  errors: Partial<IForm.IRegister>;
}

interface RegisterProps {}

export default class Login extends Component<RegisterProps, RegisterState> {
  state: RegisterState = {
    values: { username: "", password: "", gmail: "" },
    errors: {},
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let { values } = this.state;
    try {
      await schema.validate(values, {
        abortEarly: false,
      });
      this.setState({ errors: {} });
    } catch (error: any) {
      const errors: Record<string, string> = {};
      if (error instanceof yup.ValidationError) {
        for (const { path = "", message } of error.inner) {
          errors[path as keyof IForm.IRegister] = message;
        }
      }
      this.setState({ errors });
    }
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    this.setState((prev) => ({
      ...prev,
      values: { ...prev.values, [target.name]: target.value },
    }));
  };
  renderInput = (
    name: keyof IForm.IRegister,
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
      <>
        <main>
          <div className="auth-container">
            <div className="auth-header">
              <div className="auth-text">Создайте аккаунт</div>
              <div className="auth-second-text">
                Создайте учетную запись, чтобы получить больше возможностей
              </div>
            </div>
            <div className="auth-body">
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "text", "username")}
                {this.renderInput("password", "password", "password")}
                {this.renderInput("gmail", "email", "email")}
                <button className="auth-submit-btn">РЕГИСТРАЦИЯ</button>
                <div className="auth-go-to">
                  У вас уже есть аккаунт?{" "}
                  <span>
                    <Link to={"/auth/login"}>ВОЙТИ</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </main>
      </>
    );
  }
}
