# Dev Integrated Library
Developer Integrated Library

## Goal
I created this library after wanting to have the
same scripting functionality in a lot of different areas. the goal is to make it easy to use just
like you would native code. You can even keep it
embedded in the library and use it if needed

## Usage
There are two main wait to use `devil`, as a library or as injected code.
The first is the typical way

`npm install @thunderducky/devil`

However I find myself wanting to mess with the behavior a lot as well so I also made a bin function
to inject the typescript source code into my project pretty easily by writing

`npx @thunderducky/devil --inject`

Inject will look for a source folder in the directory this is run from and a new folder called "devil" within it. If this is not found then it'll use the cwd.