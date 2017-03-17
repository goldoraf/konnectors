/** @jsx h */
import { h, cloneElement } from 'preact'
import classNames from 'classnames'
import { translate } from '../plugins/preact-polyglot'
import statefulComponent from '../lib/statefulComponent'

const Field = (props) => {
  let inputs
  if (props.children.length !== 0) {
    inputs = props.children.map(
      child => cloneElement(child,
        Object.assign(props, {
          selected: props.value,
          className: 'account-field-input'
        })
      )
    )
  } else {
    const { type, placeholder, value, onChange, onInput } = props
    inputs = (
      <input
        type={type}
        placeholder={placeholder}
        className='account-field-input'
        value={value}
        onChange={onChange}
        onInput={onInput}
      />
    )
  }
  return props.type === 'hidden' ? inputs : (
    <FieldWrapper {...props}>
      {inputs}
    </FieldWrapper>
  )
}

export default Field

export const FieldWrapper = ({ required, label, dirty, touched, errors, children }) => {
  var classes = classNames('account-field', {
    'account-field--required': required === true,
    'account-field--error': errors.length !== 0,
    'account-field--dirty': dirty === true || touched === true
  })
  return (
    <div className={classes}>
      {label && <label>{label}</label>}
      {children}
      {errors.length !== 0 && errors.map((err, i) => (
        <small key={i} className='account-field-error'>{err}</small>
      ))}
    </div>
  )
}

export const PasswordField = translate()(
  statefulComponent({
    visible: false
  }, (setState) => ({
    toggleVisibility: () => {
      setState(state => ({ visible: !state.visible }))
    }
  }))(
    props => {
      const { t, placeholder, value, onChange, onInput, toggleVisibility, visible } = props
      return (
        <FieldWrapper {...props}>
          <button
            type='button'
            tabindex='-1'
            title={t('my_accounts account config show password')}
            class='icon password-visibility'
            onClick={() => toggleVisibility()}
          >
            {visible
              ? <svg><use xlinkHref={require('../assets/sprites/icon-eye-closed.svg')} /></svg>
              : <svg><use xlinkHref={require('../assets/sprites/icon-eye-open.svg')} /></svg>
            }
          </button>
          <input
            type={visible ? 'text' : 'password'}
            placeholder={placeholder}
            className='account-field-input'
            value={value}
            onChange={onChange}
            onInput={onInput}
          />
        </FieldWrapper>
      )
    }
  )
)

export const DropdownField = translate()((props) => {
  const { value, options, onChange, onInput } = props
  let valueInOptions = options.indexOf(value) !== -1
  let dropdownFieldOptions = valueInOptions ? options : [value].concat(options)

  return (
    <FieldWrapper {...props}>
      <select
        className='account-field-dropdown'
        value={value}
        onChange={onChange}
        onInput={onInput}
      >
        {dropdownFieldOptions.map(optionValue => (
          <option
            value={optionValue}
            selected={optionValue === {value}}
          >{optionValue}</option>
        ))}
      </select>
    </FieldWrapper>
  )
})
