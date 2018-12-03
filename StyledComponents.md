

###

modular scoped css for components.
**Note the import** - `styled`
e.g.
```jsx
import styled from 'styled-components';

const NiceHeader = styled.h2`
    font-size: 1.5em;
    text-align: 'center';
    color: violet;
    `;

// props based overriding
const Button = styled.button`
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: ${props => props.huge ? '2px solid palevioletred' : '1px dashed blue'};
  border-radius: 3px;
`;

/**
 * overriding component along with props customization
 * all props are also passed through to Button
 */
const OverrideButton = styled(Button)`
    padding: 0px;
    border: 3px solid green;
    ${props => props.huge ? 'font-size: 2.5em;' : ''}
    border-radius: 8px;
`;

const Header = ({ name }) => (
  <NiceHeader>
    {name}
    <Button primary>
      {'hola'}
    </Button>
    <OverrideButton huge>
      {'Override-Button'}
    </OverrideButton>
  </NiceHeader>
);
```

### Styling syntax

lightweight scss like syntax from stylis.

https://stylis.js.org/

`&` refers to componet itself.

