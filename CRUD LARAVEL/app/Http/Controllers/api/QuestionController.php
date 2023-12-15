<?php

namespace App\Http\Controllers\api;

use App\Models\Question;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class QuestionController extends Controller
{
    public function index()
    {
        try {
            $questions = Question::all();
            return response()->json([
                'code' => 200,
                'data' => $questions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'question' => 'required|string|max:255',
                'answer' => 'required|string|max:255',
                'wrong_answer_1' => 'required|string|max:255',
                'wrong_answer_2' => 'required|string|max:255',
                'wrong_answer_3' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'code' => 400,
                    'message' => $validator->errors()
                ]);
            }

            Question::create($request->all());
            return response()->json([
                'code' => 200,
                'message' => 'Question created successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function show(string $id)
    {
        try {
            $question = Question::find($id);
            return response()->json([
                'code' => 200,
                'data' => $question
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $question = Question::findOrFail($id);
            $validator = Validator::make($request->all(), [
                'question' => 'required|string|max:255',
                'answer' => 'required|string|max:255',
                'wrong_answer_1' => 'required|string|max:255',
                'wrong_answer_2' => 'required|string|max:255',
                'wrong_answer_3' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'code' => 400,
                    'message' => $validator->errors()
                ]);
            }

            $question->update($request->all());
            return response()->json([
                'code' => 200,
                'message' => 'Question updated successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            Question::findOrFail($id)->delete();
            return response()->json([
                'code' => 200,
                'message' => 'Question deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }
}
