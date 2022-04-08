import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
} from "react-native";

export default function Login() {
  this.state = {
    validating: false,
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(text) => this.setState({ email: text })} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={(text) => this.setState({ password: text })}
            />
          </Item>
          <Button
            block
            success
            style={{ marginTop: 50 }}
            onPress={() => {
              if (this.state.email && this.state.password) {
                this.validate();
              }
            }}
          >
            <Text>Authenticate</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
