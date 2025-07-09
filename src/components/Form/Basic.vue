<template>
  <div>
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="email" prop="email">
        <Input v-model="model.email"/>
      </FormItem>
      <FormItem label="password" prop="password">
        <Input type="password" v-model="model.password"/>
      </FormItem>
      <FormItem label="test" prop="test">
        <template #default="{ validate }">
          <Input type="test" v-model="model.test" @blur="validate()"/>
        </template>
      </FormItem>
      <div>
        <Button type="primary" @click="submit">Submit</Button>
        <Button @click="reset">Reset</Button>
      </div>
    </Form>
    <pre>{{ model }}</pre>
  </div>
</template>

<script lang="ts" setup>
import  Form from './Form.vue';
import FormItem from './FormItem.vue';
import Input from '../Input/Input.vue';
import Button from '../Button/Button.vue';
import { reactive } from 'vue';
import { ref } from 'vue';

const formRef = ref();

async function submit() {
  const bw = await formRef.value.validateAll();
  console.log(bw);
}

function reset() {
  formRef.value.resetAll();  
}

const model = reactive({
  email: '',
  password: '',
  test: '',
});
const rules = {
  email: [
    { type: 'email', required: true }
  ],
  password: [
    { required: true, min: 6, max: 20, trigger: 'input',type: 'string' }
  ],
  test: [
    { min: 6, max: 20, trigger: 'blur',type: 'string' },
    {required: false}
  ]
};
</script>