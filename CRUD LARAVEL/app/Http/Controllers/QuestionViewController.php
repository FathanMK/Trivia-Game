<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

class QuestionViewController extends Controller
{
    public function index(): View
    {
        $questions = Question::orderBy("id")->get();
        return view("pages.question", compact("questions"));
    }

    public function store(Request $request): RedirectResponse
    {
        $this->validate($request, [
            "question" => "required",
            "answer" => "required",
            "wrong_answer_1" => "required",
            "wrong_answer_2" => "required",
            "wrong_answer_3" => "required",
        ]);

        Question::create($request->all());
        notify()->success("Question created successfully");

        return redirect()
            ->back()
            ->with("success", "Question created successfully");
    }

    public function show($id): View
    {
        $question = Question::findOrFail($id);
        return view("pages.question", compact("question"));
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $question = Question::findOrFail($id);
        $this->validate($request, [
            "question" => "required|string|max:255",
            "answer" => "required|string|max:255",
            "wrong_answer_1" => "required|string|max:255",
            "wrong_answer_2" => "required|string|max:255",
            "wrong_answer_3" => "required|string|max:255",
        ]);

        $question->update($request->all());

        return redirect("/question")->with(
            "success",
            "Question updated successfully"
        );
    }

    public function destroy($id): RedirectResponse
    {
        $question = Question::findOrFail($id);
        $question->delete();

        return redirect()
            ->back()
            ->with("success", "Question deleted successfully");
    }
}
