
## Register naming

Here are the main registers in ARM assembly:

General Purpose Registers:
- R0-R12: General purpose registers
- R13 (SP): Stack Pointer 
- R14 (LR): Link Register, stores return address
- R15 (PC): Program Counter

Special Purpose Registers:
- CPSR: Current Program Status Register
  - Contains condition flags (N,Z,C,V)
  - Processor mode bits
  - Interrupt disable flags

Alternative Names:
- R0-R3: Often used for passing parameters
- R4-R11: Used for local variables
- R12 (IP): Intra-Procedure call scratch register

AArch64 (64-bit ARM) uses:
- X0-X30: 64-bit general purpose registers
- W0-W30: 32-bit versions of X registers
- SP: Stack pointer
- XZR/WZR: Zero registers
- PC: Program counter (not directly accessible)

Would you like me to explain more about any specific registers or their uses?

## Common pattern

`<Operator> <Destination>, <Source>`
`<Operator> <Destination>, #<Immediate>`
`<Operator> <Destination>, <Source1>, <Source2>`
`<Operator> <Destination> [Address]`

## Move Instruction (mov)

### Syntax

```asm
// move from src to destination
mov dest, src
```

1. Immediate addressing - Move a value immediate e.g. `mov R0, #0x10`
2. Register direct addressing - Move from one register to another e.g. `mov R1, R2`