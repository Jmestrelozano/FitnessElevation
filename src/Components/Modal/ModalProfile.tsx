import React from 'react';
import {Controller, useForm, FormProvider} from 'react-hook-form';
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {setSaveProfile} from '../../Store/Slices/profileSlices';

import {storeInterface} from '../../Store/store';
import {colorsPrimary, useAppDispatch, useAppSelector} from '../../Globales';
import {styles} from './stylesheetHomeModalProfile';

export const ModalProfile = ({isModal, onCloseModal}: any) => {
  const dispatch = useAppDispatch();
  const {
    userProfile: {age, height, name, weight},
  } = useAppSelector((store: storeInterface) => store.profile);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name,
      age,
      weight,
      height,
    },
  });
  const onSubmit = (data: any) => {
    if (errors.age || errors.name || errors.height || errors.weight) {
      Alert.alert('Missing fields', 'You must fill out all the information', [
        {
          text: 'Ok',
        },
      ]);
      return;
    }

    dispatch(setSaveProfile(data));
    onCloseModal();
  };

  return (
    <>
      <View style={styles.portal} />
      <Modal visible={isModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalLayout}>
            <View style={styles.modalView}>
              <View style={styles.containerIcon}>
                <Pressable onPress={onCloseModal}>
                  <Icon name="close" size={30} />
                </Pressable>
              </View>

              <FormProvider {...useForm()}>
                <Text style={styles.titleModal}>Enter your details</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <View style={styles.containerTextInput}>
                      <Icon
                        color={colorsPrimary.blue}
                        name="people"
                        size={20}
                        style={{marginRight: 5}}
                      />
                      <TextInput
                        style={{width: '100%'}}
                        placeholder="First name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="default"
                      />
                    </View>
                  )}
                  name="name"
                />

                <Controller
                  control={control}
                  rules={{
                    required: true,
                    maxLength: 2,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <View style={styles.containerTextInput}>
                      <Icon
                        color={colorsPrimary.blue}
                        name="calendar-today"
                        size={20}
                        style={{marginRight: 5}}
                      />
                      <TextInput
                        style={{width: '100%'}}
                        placeholder="Age"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="number-pad"
                      />
                    </View>
                  )}
                  name="age"
                />

                <Controller
                  control={control}
                  rules={{required: true, maxLength: 4}}
                  render={({field: {onChange, onBlur, value}}) => (
                    <View style={styles.containerTextInput}>
                      <Icon
                        color={colorsPrimary.blue}
                        name="straighten"
                        size={20}
                        style={{marginRight: 5}}
                      />
                      <TextInput
                        style={{width: '100%'}}
                        placeholder="Weight"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={String(value)}
                        keyboardType="number-pad"
                      />
                    </View>
                  )}
                  name="weight"
                />

                <Controller
                  control={control}
                  rules={{
                    required: true,
                    maxLength: 4,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <View style={styles.containerTextInput}>
                      <Icon
                        color={colorsPrimary.blue}
                        name="straighten"
                        size={20}
                        style={{marginRight: 5}}
                      />
                      <TextInput
                        style={{width: '100%'}}
                        placeholder="Height"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={String(value)}
                        keyboardType="number-pad"
                      />
                    </View>
                  )}
                  name="height"
                />

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.buttonSave}
                  onPress={handleSubmit(onSubmit)}>
                  <Text style={styles.textButtonSave}>Save Profile</Text>
                </TouchableOpacity>
              </FormProvider>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
