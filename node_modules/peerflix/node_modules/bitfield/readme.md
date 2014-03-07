#BitField

a very simple bitfield

    npm install bitfield

####Methods
`BitField(data)`: Data can be either a buffer, WebGL Int8Array or numeric array, or a number representing the maximum number of supported bytes.

`BitField#get(index)`: Returns a boolean indicating whether the bit is set.

`BitField#set(index[, value])`: Values defaults to true. Sets the bit to the boolean value of the value (true = 1, false = 0).

####Properties
`BitField#buffer`: The contents of the BitField.
