const express = require('express');
const mongoose = require('mongoose');
const Question = require('../models/question-model');

const create = async (req,res,next) => {

  const { question ,answer, marks , about , option1, option2 } = req.body;

              var new_question = new Question({
                 question,
                 answer,
                 marks,
                 about,
                 option1,
                 option2
              });

                      new_question.save(function (err) {
                          if (err) {
                              console.log(err);
                          } else {
                              req.flash('success', 'Added new question!');
                              console.log("added");
                              res.redirect('/');
                          }

                        });
}


exports.create = create;
