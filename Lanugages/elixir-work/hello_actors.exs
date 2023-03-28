defmodule Talker do
  def loop do
    receive do
      {:greet, name} ->
        IO.puts("Hello #{name}")

      {:praise, name} ->
        IO.puts("#{name} You are amazing")

      {:celebrate, name, age} ->
        IO.puts("Here is to another #{age} years, #{name}")
        # code
    end

    loop
  end
end

pid = spawn(&Talker.loop/0)
send(pid, {:greet, "Huey"})
send(pid, {:praise, "Dewey"})
Process.sleep(1000)
