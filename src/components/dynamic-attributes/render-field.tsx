import { CheckboxComponent, NumberComponent, RadioComponent, TextBoxComponent } from "./render-fields-ui-components";

export const RenderField : any = (props: {
    field: any,
    updatedField: any
}) => {
    // console.log('Render 7',props)
    switch (props.field.attribute_type.name){
        case 'checkbox': 
            return (
                <CheckboxComponent 
                field={props.field}
                updatedField={props.updatedField}
                />
            )
        case 'text':
            return (
                <TextBoxComponent
                field={props.field}
                updatedField={props.updatedField}
                />
            )
        case 'number':
            return (
                <NumberComponent
                field={props.field}
                updatedField={props.updatedField}
                />
            )
        case 'radio':
            return (
                <RadioComponent
                field={props.field}
                updatedField={props.updatedField}
                />
            )
    }
}