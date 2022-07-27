import {
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  extendTheme,
  Box,
  Button,
} from "@chakra-ui/react";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

export default function App(props: {
  label: string;
  isRequired: boolean;
  fieldProps: any;
  formProps: any;
  type?: string;
  widthCustom?: object;
  style?: any;
}) {
  const {
    label,
    isRequired = false,
    fieldProps,
    formProps,
    type = "text",
    widthCustom = { base: "auto" },
    style = {},
  } = props;
  return (
    <ChakraProvider theme={theme}>
      <Box p={3} style={style}>
        <FormControl
          variant="floating"
          id="floating-form"
          isRequired={isRequired}
          isInvalid={formProps.errors.name && formProps.touched.name}
        >
          <Input {...fieldProps} placeholder=" " type={type} w={widthCustom} />
          <FormLabel>{label}</FormLabel>
        </FormControl>
      </Box>
    </ChakraProvider>
  );
}
