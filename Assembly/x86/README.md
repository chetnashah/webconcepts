

## Intel vs AT&T syntax

### Intel syntax ( no percentage) , mostly on windows

Also , `Destination, Source`.
e.g.
`mov dst, src` - reverse convention

### AT&T syntax

- Common in `*nix/GNU`.
- Registers get a `%` e.g. `%eax`.
- Immediates get a `$` e.g. `$5`.
- `mov src, dest` - easier simpler.

## 16 general purpose registers

- But 2 of them are special purpose registers.
- 14 of them are general purpose registers.

First there was only 8 bit A register for accumulator.
Then 16 bit AX register for accumulator- which has two 8 bit parts AL and AH.
Then 32 bit EAX register for accumulator- which has two 16 bit parts AX and DX.
Then 64 bit RAX register for accumulator- which has two 32 bit parts EAX and EDX.

So 
8 bit = A
16 bit = AX 
32 bit = EAX 
64 bit = RAX (R stands for really-wide?)

### Double, word and byte registers (for lower end)

R0 = 64 bit register
R0D = EAX = lower 32 bits of R0 (D stands for double)
R0W = AX = lower 16 bits of R0 (W stands for word)
R0B = AL = lower 8 bits of R0 (B stands for byte)   

### IP register

16 bit - IP register
32 bit - EIP register
64 bit - RIP register

### Stack pointer

64 bit - RSP register = R4
32 bit - ESP register = R4D
16 bit - SP register = R4W

### Frame pointer

64 bit - RBP register = R5
32 bit - EBP register = R5D
16 bit - BP register = R5W

### Source index register

64 bit - RSI register = R6
32 bit - ESI register = R6D
16 bit - SI register = R6W

### Destination index register

64 bit - RDI register = R7
32 bit - EDI register = R7D
16 bit - DI register = R7W

## Memory diagram conventions

In memory diagrams, higher addresses are conventionally drawn at the top. So when we say the stack grows "downward", it means:

```
Higher addresses  [0xFFFF]     Top of memory
                  ...
                  [0x1008]     <- Old ESP
                  [0x1004]     <- New ESP after PUSH
                  [0x1000]
Lower addresses  [0x0000]     Bottom of memory
```

When you PUSH, the stack pointer moves toward lower addresses (downward), even though this is visually represented as moving down the diagram from top to bottom.

### Stack grows downward

## MOV instruction - `mov dst, src` - **Note:** `dst` comes first



## Stack operations - PUSH and POP

#### Push

- **Automatically decrements the stack pointer (RSP)** by the size of the data being pushed.

## CALL instruction - `call dst` - for function calls

The CALL instruction in x86 assembly performs two main operations (automatically):

1. Pushes the return address (next instruction after CALL) onto the stack (decrements ESP/SP by 2 or 4)
2. Jumps to the target procedure address (Sets RIP/EIP/IP to target address)

Basic syntax forms:
```nasm
CALL procedure_label    ; Direct call within same segment
CALL FAR procedure     ; Far call to different segment
CALL register         ; Indirect call through register
CALL [memory]         ; Indirect call through memory location
```

Example usage:
```nasm
section .text
    global _start
    
_start:
    CALL my_procedure  ; Call the procedure
    mov eax, 1        ; This is the return address
    
my_procedure:
    push ebp          ; Function prologue
    mov ebp, esp
    ; ... procedure code ...
    pop ebp           ; Function epilogue
    ret              ; Return to caller
```

## RET instruction

- Pop the top of the stack (return address) into RIP, so we can return back to the calling procedure

## Addressing forms

The **x86 addressing modes** describe how the processor identifies the location of an operand (data) required for an operation. These addressing modes are used in x86 assembly language to specify where to find the data (in registers, memory, or as an immediate value). Understanding these modes is crucial for optimizing code and working effectively with assembly. Below, the main x86 addressing modes are explained in detail:

---

### 1. **Immediate Addressing Mode**
In this mode, the operand is specified as a constant directly in the instruction.

- **Example**: `MOV AX, 5`
  - Here, the value `5` is directly embedded in the instruction as an immediate operand and is moved to the `AX` register.

---

### 2. **Register Addressing Mode**
The operand is located in a register. The instruction specifies the register directly.

- **Example**: `MOV AX, BX`
  - This moves the content of the `BX` register into the `AX` register.

---

### 3. **Direct Addressing Mode**
The operand is located at a specific memory address, which is directly specified in the instruction.

- **Example**: `MOV AX, [1234H]`
  - The value stored at memory address `1234H` is loaded into the `AX` register.

---

### 4. **Indirect Addressing Mode**
The memory address of the operand is determined by the contents of a register or memory location. These are common in pointer-based operations.

#### Examples:
- **Register Indirect**: `MOV AX, [BX]`
  - The value at the memory address stored in the `BX` register is loaded into `AX`.

- **Base + Offset**: `MOV AX, [BX+5]`
  - The effective address is calculated by adding an offset (`5`) to the value in `BX`. The value at this computed address is moved to `AX`.

---

### 5. **Indexed Addressing Mode**
An index register (e.g., `SI` or `DI`) is used to calculate the effective address.

- **Example**: `MOV AX, [SI]`
  - The operand is located at the memory address specified by the `SI` register.

---

### 6. **Base-Indexed Addressing Mode**
This mode combines a base register and an index register to calculate the effective address.

- **Example**: `MOV AX, [BX+SI]`
  - The effective address is calculated by adding the values in `BX` (base) and `SI` (index). The value at this address is moved to `AX`.

---

### 7. **Base-Indexed with Displacement Addressing Mode**
This mode combines a base register, an index register, and a displacement (offset) to calculate the effective address.

- **Example**: `MOV AX, [BX+SI+10]`
  - The effective address is computed as: `BX + SI + 10`. The value at this address is loaded into `AX`.

---

### 8. **Scaled Index Addressing Mode** (Available in 32-bit and 64-bit x86)
This mode is used in modern x86 processors where an index register is multiplied by a scaling factor (1, 2, 4, or 8) and added to a base register or displacement to calculate the effective address.

- **Example**: `MOV EAX, [EBX + 4*ESI + 8]`
  - The effective address is calculated as: `EBX + 4 * ESI + 8`.

---

### 9. **Relative Addressing Mode**
The address of the operand is specified relative to the current instruction pointer (`IP` or `EIP`).

- **Example**: `JMP SHORT LABEL`
  - The jump instruction computes the target address relative to the instruction pointer.

---

### Summary Table of x86 Addressing Modes

| Addressing Mode            | Description                                                                 | Example                  |
|----------------------------|-----------------------------------------------------------------------------|--------------------------|
| Immediate                  | Operand is a constant value                                                 | `MOV AX, 5`             |
| Register                   | Operand is in a register                                                   | `MOV AX, BX`            |
| Direct                     | Operand is at a specific memory address                                     | `MOV AX, [1234H]`       |
| Indirect                   | Address is in a register                                                   | `MOV AX, [BX]`          |
| Indexed                    | Address is in an index register (`SI` or `DI`)                             | `MOV AX, [SI]`          |
| Base + Offset              | Address is base register + displacement                                     | `MOV AX, [BX+5]`        |
| Base-Indexed               | Address is base register + index register                                   | `MOV AX, [BX+SI]`       |
| Base-Indexed + Displacement| Address is base register + index register + displacement                    | `MOV AX, [BX+SI+10]`    |
| Scaled Index               | Address is base register + scaled index register + displacement             | `MOV EAX, [EBX+4*ESI+8]`|
| Relative                   | Address is relative to the instruction pointer                              | `JMP SHORT LABEL`       |

---

### Key Notes:
1. **Effective Address**: For memory operands, the effective address is the calculated memory address based on the addressing mode.
2. **Segmentation**: On 16-bit x86 processors, memory references are also affected by segment registers like `CS`, `DS`, `ES`, etc., which define the segment base address.
3. **32-bit/64-bit Modes**: Advanced modes like scaled index addressing are primarily used in 32-bit and 64-bit x86 architectures, enabling more complex memory addressing.

By choosing the appropriate addressing mode, programmers can write efficient and compact assembly code tailored to their application's needs.

## Calling convention

1. `cdecl` - C declaration
2. `stdcall` - Standard call
3. `fastcall` - Fast call
4. `thiscall` - This call
5. `pascal` - Pascal call

### Return value

For 32-bit x86 the return value is in the `eax` register.
For 64-bit x86 the return value is in the `edx:eax` register.
