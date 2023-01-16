import React from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
// import AuthLogo from "../../layouts/logo/AuthLogo";
// import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
// import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';

// import { useAuth } from '../../Context/authContext';

const RegisterForm = () => {
  const navigate = useNavigate();
  // const { signup } = useAuth();
  const initialValues = {
    UserName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    UserName: Yup.string().required('UserName is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });
  const handleSubmit = async (UserName, email, password) => {
    try {
      console.log(UserName);
      // const requestOptions = {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: email, username: UserName })
      // };
      // const response = await fetch('http://192.168.1.77:5500/', requestOptions);
      // const data = await response.json();
      console.log(UserName, email, password);
      // await signup(email, password, UserName, "client");
      navigate('/');

    } catch (error) {
      // eslint-disable-next-line
      // alert(error.code)
      console.log(error)
    }
  }
  return (
    <div className="loginBox">
      {/* <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" /> */}
      <div className='d-flex justify-content-start'
        style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FFondoFreePOSRegister2.png?alt=media&token=4e42cddd-a7ca-4570-8884-4b03eb8fb61c')", backgroundSize: "cover", height: "100vh" }}>


        <Container fluid className="h-100 m-0 justify-content-center align-items-center loginContainer">
          <Row className="justify-content-center align-items-center h-100">
            <Col sm="12" lg="6" md="6" className="loginContainer px-0">
              {/* <AuthLogo /> */}
              <Card>
                <h1 className='text-center mainTitle px-4 m-1' style={{ color: "#077CAB" }}><strong>Koonol</strong></h1>

                <CardBody className="p-4 m-1">
                  <h4 className="mb-0 fw-bold">Registrar</h4>
                  <small className="pb-4 d-block">
                    ¿Ya tienes cuenta? <Link to="/auth/loginform">Inicio de sesión</Link>
                  </small>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(fields) => {
                      // // eslint-disable-next-line no-alert
                      // alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                      handleSubmit(fields.UserName, fields.email, fields.password);
                    }}
                    render={({ errors, touched }) => (
                      <Form>
                        <FormGroup>
                          <Label htmlFor="firstName">Nombre del usuario</Label>
                          <Field
                            name="UserName"
                            type="text"
                            className={`form-control ${errors.UserName && touched.UserName ? ' is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                            name="UserName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="email">Correo</Label>
                          <Field
                            name="email"
                            type="text"
                            className={`form-control${errors.email && touched.email ? ' is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="password">Contraseña</Label>
                          <Field
                            name="password"
                            type="password"
                            className={`form-control${errors.password && touched.password ? ' is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                          <Field
                            name="confirmPassword"
                            type="password"
                            className={`form-control${errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup inline className="form-check d-flex justify-content-start p-0">
                          <Field
                            type="checkbox"
                            name="acceptTerms"
                            id="acceptTerms"
                            style={{marginRight:"3px"}}
                            className={`form-check-input ${errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : ''
                              }`}
                          />
                          <Label htmlFor="acceptTerms" className="form-check-label">
                            Acepto los terminos y condiciones
                          </Label>
                          <ErrorMessage
                            name="acceptTerms"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Button type="submit" style={{backgroundColor:"#077CAB",borderColor:"#077CAB"}} className="me-2">
                            Registrar
                          </Button>
                          {/* <Button type="reset" color="secondary">
                            Reiniciar
                          </Button> */}
                        </FormGroup>
                      </Form>
                    )}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default RegisterForm;
