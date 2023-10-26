export const isValidDate = (date) => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateFormat.test(text)) {
      Alert.alert('Error', 'Formato de fecha no válido. Utilice YYYY-MM-DD.');
    } else if (!moment(text, 'YYYY-MM-DD').isValid()) {
      Alert.alert('Error', 'Fecha no válida. Verifique la fecha.');
    } else {
      // La entrada es una fecha válida, actualiza el estado
    }
  };