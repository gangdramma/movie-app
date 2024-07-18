import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IForm } from "../../../../modules/auth/types";
import "../styles/register.scss";
import * as yup from "yup";
import { Input } from "../../../../components";
import { Api } from "../../../../modules/auth";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Необходимо указать имя пользователя")
    .min(6, "Имя пользователя должно быть не менее 6 символов")
    .max(25, "Имя пользователя должно содержать не более 25 символов"),
  password: yup
    .string()
    .required("Необходимо ввести пароль")
    .min(6, "Пароль должен быть не менее 6 символов")
    .max(30, "Пароль должен содержать не более 30 символов"),
  gmail: yup
    .string()
    .required("Необходимо указать gmail")
    .email("Неверный формат gmail"),
});

interface RegisterState {
  values: IForm.IRegister;
  errors: Partial<Record<keyof IForm.IRegister, string>>;
  touched: Partial<Record<keyof IForm.IRegister, boolean>>;
  isLoading: boolean;
}

interface RegisterProps {}

export default class Register extends Component<RegisterProps, RegisterState> {
  state: RegisterState = {
    values: { username: "", password: "", gmail: "" },
    errors: {},
    touched: {},
    isLoading: false,
  };

  validate = async (values: IForm.IRegister) => {
    const errors: Partial<Record<keyof IForm.IRegister, string>> = {};

    try {
      await schema.validate(values, { abortEarly: false });
      return null;
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        for (const { path = "", message } of error.inner) {
          errors[path as keyof IForm.IRegister] = message;
        }
      }
      return errors;
    }
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const errors = await this.validate(this.state.values);

    if (errors) {
      this.setState({ errors, isLoading: false });
      return;
    }

    try {
      await Api.Register(this.state.values);
      toast.success("Успешно авторизован");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    this.setState(
      (prevState) => ({
        values: {
          ...prevState.values,
          [name]: value,
        },
        touched: {
          ...prevState.touched,
          [name]: true,
        },
      }),
      async () => {
        if (this.state.touched[name as keyof IForm.IRegister]) {
          const errors = await this.validate(this.state.values);
          this.setState({ errors: errors || {} });
        }
      }
    );
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

  renderButton = (title: string) => (
    <button
      className={`auth-submit-btn ${this.state.isLoading ? "disabled" : ""}`}
      disabled={this.state.isLoading}
    >
      {this.state.isLoading ? "РЕГИСТРАЦИЯ..." : title}
    </button>
  );

  render() {
    return (
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
              {this.renderInput("username", "text", "Имя пользователя")}
              {this.renderInput("password", "password", "Пароль")}
              {this.renderInput("gmail", "email", "Gmail")}
              {this.renderButton("РЕГИСТРАЦИЯ")}
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
    );
  }
}
